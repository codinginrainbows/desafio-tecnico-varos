import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/clientes - Listar apenas usuários do tipo cliente
export async function GET() {
  try {
    const clientes = await prisma.usuario.findMany({
      where: {
        isConsultor: false,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
      },
      orderBy: {
        nome: "asc",
      },
    });

    return NextResponse.json(clientes);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return NextResponse.json(
      { error: "Erro ao buscar clientes" },
      { status: 500 }
    );
  }
}
