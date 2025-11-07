"use client";

import { useState } from "react";
import Button from "@/components/ds/button/Index";
import Card from "@/components/ds/card/Index";
import { Table } from "@/components/ds/table/Index";
import Filters from "@/components/ds/table/filter/Index";
import Title from "@/components/ds/title/Index";
import BaseLayout from "@/components/layouts/base/Index";
import { SkeletonTable } from "@/components/ds/skeleton/Index";
import PlusIcon from "@/assets/icons/plus.svg";
import { useRouter } from "next/navigation";
import { useUsuarios } from "@/hooks/useUsuarios";
import { maskCPF, maskPhone, maskCEP } from "@/lib/validators";
import { columns } from "@/__mocks__/mocks";

const Home = () => {
  const router = useRouter();
  const { usuarios, loading, error } = useUsuarios();
  const [selectedConsultor, setSelectedConsultor] = useState<string>("");

  const consultores = usuarios.filter((u) => u.isConsultor);

  const consultorNameOptions = consultores.map((c) => ({
    value: c.id,
    label: c.nome,
  }));

  const consultorEmailOptions = consultores.map((c) => ({
    value: c.id,
    label: c.email,
  }));

  const consultorSelecionado = usuarios.find((u) => u.id === selectedConsultor);

  const todosClientes = usuarios.filter((u) => !u.isConsultor);

  const tableData = selectedConsultor
    ? consultorSelecionado?.clientesVinculados?.map((relacao) => ({
        id: relacao.cliente.id,
        nome: relacao.cliente.nome,
        email: relacao.cliente.email,
        telefone: relacao.cliente.telefone
          ? maskPhone(relacao.cliente.telefone)
          : "-",
        cpf: relacao.cliente.cpf ? maskCPF(relacao.cliente.cpf) : "-",
        idade: relacao.cliente.idade || "-",
        endereco: relacao.cliente.endereco || "-",
        createdAt: new Date(relacao.cliente.createdAt).toLocaleDateString(
          "pt-BR"
        ),
        updatedAt: new Date(relacao.cliente.updatedAt).toLocaleDateString(
          "pt-BR"
        ),
        onClick: () => router.push(`/user-update?id=${relacao.cliente.id}`),
      })) || []
    : todosClientes.map((cliente) => ({
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone ? maskPhone(cliente.telefone) : "-",
        cpf: cliente.cpf ? maskCPF(cliente.cpf) : "-",
        idade: cliente.idade || "-",
        endereco: cliente.endereco || "-",
        createdAt: new Date(cliente.createdAt).toLocaleDateString("pt-BR"),
        updatedAt: new Date(cliente.updatedAt).toLocaleDateString("pt-BR"),
        onClick: () => router.push(`/user-update?id=${cliente.id}`),
      }));

  const totalClientes = todosClientes.length;

  if (error) {
    return (
      <BaseLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-400">Erro: {error}</p>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6 mb-2">
        <Title text="Dashboard" className="mb-4 sm:mb-8" />
        <Button
          text="Criar Usuário"
          variant="primary"
          rounded={false}
          icon={PlusIcon}
          onClick={() => router.push("/user-create")}
          className="w-full sm:w-auto"
        />
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-end gap-6 mb-8">
        <Card
          label="Total de clientes"
          value={totalClientes}
          subtitle="cadastrados no sistema"
          showTrend={true}
        />
        <div className="w-full lg:max-w-3xl">
          <Filters
            nameOptions={consultorNameOptions}
            emailOptions={consultorEmailOptions}
            onFilterChange={(filters) => {
              const consultorId =
                filters.consultorName || filters.consultorEmail || "";
              setSelectedConsultor(consultorId);
            }}
          />
        </div>
      </div>

      {loading ? (
        <SkeletonTable />
      ) : tableData.length === 0 ? (
        <div className="flex items-center justify-center h-64 bg-gray-950 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-center px-4">
            {selectedConsultor
              ? "Este consultor não possui clientes vinculados"
              : "Nenhum cliente cadastrado no sistema"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table columns={columns} data={tableData} />
        </div>
      )}
    </BaseLayout>
  );
};

export default Home;
