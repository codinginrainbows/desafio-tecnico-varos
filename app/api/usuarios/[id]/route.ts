import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/usuarios/:id - Buscar um usuário específico
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const usuario = await prisma.usuario.findUnique({
      where: { id },
      include: {
        clientesVinculados: {
          include: {
            cliente: {
              select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                cpf: true,
              },
            },
          },
        },
        consultoresVinculados: {
          include: {
            consultor: {
              select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
              },
            },
          },
        },
      },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(usuario);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuário" },
      { status: 500 }
    );
  }
}

// PUT /api/usuarios/:id - Atualizar usuário
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const {
      nome,
      email,
      telefone,
      cpf,
      idade,
      cep,
      estado,
      endereco,
      complemento,
      tipoUsuario,
      clientesIds, // Novos IDs de clientes (se for consultor)
    } = body;

    // Buscar usuário atual
    const usuarioAtual = await prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuarioAtual) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const isConsultor = tipoUsuario === "consultor";

    // Se mudou de CONSULTOR para CLIENTE, deletar relações
    if (usuarioAtual.isConsultor && !isConsultor) {
      await prisma.usuarioRelacao.deleteMany({
        where: { consultorId: id },
      });
    }

    // Atualizar dados do usuário
    const usuario = await prisma.usuario.update({
      where: { id },
      data: {
        nome,
        email,
        telefone,
        cpf,
        idade: parseInt(idade),
        cep,
        estado,
        endereco,
        complemento: complemento || null,
        isConsultor,
      },
    });

    // Se for consultor, atualizar relações com clientes
    if (isConsultor && clientesIds !== undefined) {
      // Deletar relações antigas
      await prisma.usuarioRelacao.deleteMany({
        where: { consultorId: id },
      });

      // Criar novas relações
      if (clientesIds.length > 0) {
        await prisma.usuarioRelacao.createMany({
          data: clientesIds.map((clienteId: string) => ({
            consultorId: usuario.id,
            clienteId: clienteId,
          })),
        });
      }
    }

    // Buscar usuário atualizado com relações
    const usuarioCompleto = await prisma.usuario.findUnique({
      where: { id },
      include: {
        clientesVinculados: {
          include: {
            cliente: true,
          },
        },
        consultoresVinculados: {
          include: {
            consultor: true,
          },
        },
      },
    });

    return NextResponse.json(usuarioCompleto);
  } catch (error: any) {
    console.error("Erro ao atualizar usuário:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email ou CPF já cadastrado" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao atualizar usuário" },
      { status: 500 }
    );
  }
}

// DELETE /api/usuarios/:id - Deletar usuário
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const usuario = await prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // O Prisma vai deletar as relações automaticamente por causa do onDelete: Cascade
    await prisma.usuario.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Usuário deletado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao deletar usuário" },
      { status: 500 }
    );
  }
}
