import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get("tipo");

    const usuarios = await prisma.usuario.findMany({
      where: tipo ? { isConsultor: tipo === "consultor" } : undefined,
      include: {
        clientesVinculados: {
          include: {
            cliente: true,
          },
        },
        consultoresVinculados: {
          include: {
            consultor: {
              select: {
                id: true,
                nome: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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
      isConsultor,
      clientesIds,
    } = body;

    const usuario = await prisma.usuario.create({
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
        isConsultor: Boolean(isConsultor),
      },
    });

    if (isConsultor && clientesIds && clientesIds.length > 0) {
      await prisma.usuarioRelacao.createMany({
        data: clientesIds.map((clienteId: string) => ({
          consultorId: usuario.id,
          clienteId: clienteId,
        })),
      });
    }

    const usuarioCompleto = await prisma.usuario.findUnique({
      where: { id: usuario.id },
      include: {
        clientesVinculados: {
          include: {
            cliente: true,
          },
        },
      },
    });

    return NextResponse.json(usuarioCompleto, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email ou CPF já cadastrado" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}
