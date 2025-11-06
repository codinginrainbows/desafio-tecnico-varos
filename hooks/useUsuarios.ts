import { useState, useEffect } from "react";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  idade: number;
  cep: string;
  estado: string;
  endereco: string;
  complemento: string | null;
  isConsultor: boolean;
  createdAt: string;
  updatedAt: string;
  clientesVinculados?: {
    cliente: Usuario;
  }[];
  consultoresVinculados?: {
    consultor: {
      id: string;
      nome: string;
      email: string;
    };
  }[];
}

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/usuarios");
      if (!response.ok) throw new Error("Erro ao buscar usuários");
      const data = await response.json();
      setUsuarios(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return { usuarios, loading, error, refetch: fetchUsuarios };
}

export function useUsuario(id: string | null) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setUsuario(null);
      return;
    }

    const fetchUsuario = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/usuarios/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar usuário");
        const data = await response.json();
        setUsuario(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  return { usuario, loading, error };
}

export function useClientes() {
  const [clientes, setClientes] = useState<
    { id: string; nome: string; email: string; telefone: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/clientes");
        if (!response.ok) throw new Error("Erro ao buscar clientes");
        const data = await response.json();
        setClientes(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  return { clientes, loading, error };
}

export async function createUsuario(data: any) {
  const response = await fetch("/api/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao criar usuário");
  }

  return response.json();
}

export async function updateUsuario(id: string, data: any) {
  const response = await fetch(`/api/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao atualizar usuário");
  }

  return response.json();
}

export async function deleteUsuario(id: string) {
  const response = await fetch(`/api/usuarios/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao deletar usuário");
  }

  return response.json();
}
