"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/ds/button/Index";
import { Input } from "@/components/ds/input/Index";
import { SingleSelect } from "@/components/ds/select/single-select/Index";
import { MultiSelect } from "@/components/ds/select/multi-select/Index";
import { Tabs } from "@/components/ds/tabs/Index";
import type { Tab } from "@/components/ds/tabs/Index";
import BaseLayout from "@/components/layouts/base/Index";
import Title from "@/components/ds/title/Index";
import { stateOptions } from "@/__mocks__/mocks";
import {
  useUsuario,
  useClientes,
  updateUsuario,
  deleteUsuario,
} from "@/hooks/useUsuarios";
import { useRouter, useSearchParams } from "next/navigation";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  tipoUsuario: string;
  idade: string;
  cpf: string;
  cep: string;
  estado: string;
  endereco: string;
  complemento: string;
  clientesIds: string[];
}

const UserUpdate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const { usuario, loading: loadingUsuario } = useUsuario(userId);
  const { clientes, loading: loadingClientes } = useClientes();
  const [saving, setSaving] = useState(false);

  const { handleSubmit, watch, setValue, reset } = useForm<FormData>({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      tipoUsuario: "",
      idade: "",
      cpf: "",
      cep: "",
      estado: "",
      endereco: "",
      complemento: "",
      clientesIds: [],
    },
  });

  const tipoUsuario = watch("tipoUsuario");

  useEffect(() => {
    if (usuario) {
      reset({
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        tipoUsuario: usuario.isConsultor ? "consultor" : "cliente",
        idade: String(usuario.idade),
        cpf: usuario.cpf,
        cep: usuario.cep,
        estado: usuario.estado,
        endereco: usuario.endereco,
        complemento: usuario.complemento || "",
        clientesIds: usuario.clientesVinculados?.map((c) => c.cliente.id) || [],
      });
    }
  }, [usuario, reset]);

  const onSubmit = async (data: FormData) => {
    if (!userId) return;

    try {
      setSaving(true);

      const payload = {
        ...data,
        idade: parseInt(data.idade),
      };

      await updateUsuario(userId, payload);
      alert("Usuário atualizado com sucesso!");
      router.push("/");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Erro ao atualizar usuário"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!userId) return;

    if (confirm("Tem certeza que deseja deletar este usuário?")) {
      try {
        await deleteUsuario(userId);
        alert("Usuário deletado com sucesso!");
        router.push("/");
      } catch (error) {
        alert(
          error instanceof Error ? error.message : "Erro ao deletar usuário"
        );
      }
    }
  };

  const userTypeOptions = [
    { value: "cliente", label: "Cliente" },
    { value: "consultor", label: "Consultor" },
  ];

  const clientOptions = clientes.map((c) => ({
    value: c.id,
    label: `${c.nome} (${c.email})`,
  }));

  const basicInfoContent = (
    <div className="grid grid-cols-2 gap-6 mt-6">
      <Input
        label="Idade"
        placeholder="28"
        type="number"
        value={watch("idade")}
        onChange={(value) => setValue("idade", value)}
      />
      <Input
        label="CPF"
        placeholder="000.000.000-00"
        value={watch("cpf")}
        onChange={(value) => setValue("cpf", value)}
      />
      <Input
        label="CEP"
        placeholder="00000-000"
        value={watch("cep")}
        onChange={(value) => setValue("cep", value)}
      />
      <SingleSelect
        label="Estado"
        options={stateOptions}
        placeholder="Selecione o estado"
        value={watch("estado")}
        onChange={(value) => setValue("estado", value)}
      />
      <div className="col-span-2">
        <Input
          label="Endereço"
          placeholder="Digite o endereço"
          value={watch("endereco")}
          onChange={(value) => setValue("endereco", value)}
        />
      </div>
      <div className="col-span-2">
        <Input
          label="Complemento"
          placeholder="Digite o complemento"
          value={watch("complemento")}
          onChange={(value) => setValue("complemento", value)}
        />
      </div>
    </div>
  );

  const addClientsContent = (
    <div className="mt-6">
      {tipoUsuario !== "consultor" ? (
        <div className="p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
          <p className="text-yellow-500 text-sm">
            ⚠️ Apenas consultores podem ter clientes vinculados
          </p>
        </div>
      ) : loadingClientes ? (
        <p className="text-gray-400">Carregando clientes...</p>
      ) : (
        <MultiSelect
          label="Clientes"
          options={clientOptions}
          placeholder="Selecione os clientes"
          value={watch("clientesIds")}
          onChange={(values) => setValue("clientesIds", values)}
        />
      )}
    </div>
  );

  const subTabs: Tab[] = [
    {
      id: "basic",
      label: "Informações básicas",
      content: basicInfoContent,
    },
    {
      id: "clients",
      label: "Adicionar clientes",
      content: addClientsContent,
    },
  ];

  if (!usuario && !loadingUsuario) {
    return (
      <BaseLayout width="900px">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-400">Usuário não encontrado</p>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout
      width="900px"
      headerContent={
        <div className="flex gap-4">
          <Button
            text={saving ? "Salvando..." : "Salvar Alterações"}
            variant="primary"
            rounded={true}
            onClick={handleSubmit(onSubmit)}
            disabled={saving}
          />
          <Button
            text="Deletar Usuário"
            variant="secondary"
            rounded={true}
            onClick={handleDelete}
            disabled={saving}
          />
        </div>
      }
    >
      <div className="bg-gray-950 rounded-lg p-8">
        <Title text="Editar Usuário" />
        <div className="space-y-6">
          <SingleSelect
            label="Tipo do usuário"
            options={userTypeOptions}
            value={watch("tipoUsuario")}
            onChange={(value) => setValue("tipoUsuario", value)}
            placeholder="Selecione o tipo de usuário"
          />

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Nome"
              placeholder="Digite o nome"
              value={watch("nome")}
              onChange={(value) => setValue("nome", value)}
            />
            <Input
              label="Telefone"
              placeholder="Digite o telefone"
              type="tel"
              value={watch("telefone")}
              onChange={(value) => setValue("telefone", value)}
            />
          </div>

          <Input
            label="Email"
            placeholder="Digite o email"
            type="email"
            value={watch("email")}
            onChange={(value) => setValue("email", value)}
          />

          <Tabs tabs={subTabs} />
        </div>
      </div>
    </BaseLayout>
  );
};

export default UserUpdate;
