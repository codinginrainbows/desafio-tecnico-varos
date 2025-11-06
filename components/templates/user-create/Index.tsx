"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Button from "@/components/ds/button/Index";
import { Input } from "@/components/ds/input/Index";
import { SingleSelect } from "@/components/ds/select/single-select/Index";
import { MultiSelect } from "@/components/ds/select/multi-select/Index";
import { Tabs } from "@/components/ds/tabs/Index";
import type { Tab } from "@/components/ds/tabs/Index";
import BaseLayout from "@/components/layouts/base/Index";
import Title from "@/components/ds/title/Index";
import { stateOptions } from "@/__mocks__/mocks";
import { useClientes, createUsuario } from "@/hooks/useUsuarios";
import { useRouter } from "next/navigation";
import {
  userFormSchema,
  type UserFormData,
  maskCPF,
  maskPhone,
  maskCEP,
  unmaskCPF,
  unmaskPhone,
  unmaskCEP,
} from "@/lib/validators";

const UserCreate = () => {
  const router = useRouter();
  const { clientes, loading: loadingClientes } = useClientes();
  const [saving, setSaving] = useState(false);

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    mode: "onBlur",
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      isConsultor: false,
      idade: "",
      cpf: "",
      cep: "",
      estado: "",
      endereco: "",
      complemento: "",
      clientesIds: [],
    },
  });

  const isConsultor = watch("isConsultor");

  const onSubmit = async (data: UserFormData) => {
    try {
      setSaving(true);

      const payload = {
        nome: data.nome,
        email: data.email,
        cpf: unmaskCPF(data.cpf),
        telefone: unmaskPhone(data.telefone),
        cep: unmaskCEP(data.cep),
        idade: parseInt(data.idade),
        estado: data.estado,
        endereco: data.endereco,
        complemento: data.complemento || "",
        isConsultor: Boolean(data.isConsultor),
        clientesIds: data.clientesIds || [],
      };

      await createUsuario(payload);
      toast.success("Usuário criado com sucesso!");
      router.push("/");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao criar usuário"
      );
    } finally {
      setSaving(false);
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
        error={errors.idade?.message}
      />
      <Input
        label="CPF"
        placeholder="000.000.000-00"
        value={watch("cpf")}
        onChange={(value) =>
          setValue("cpf", maskCPF(value), { shouldValidate: true })
        }
        error={errors.cpf?.message}
      />
      <Input
        label="CEP"
        placeholder="00000-000"
        value={watch("cep")}
        onChange={(value) =>
          setValue("cep", maskCEP(value), { shouldValidate: true })
        }
        error={errors.cep?.message}
      />
      <SingleSelect
        label="Estado"
        options={stateOptions}
        placeholder="Selecione o estado"
        value={watch("estado")}
        onChange={(value) =>
          setValue("estado", value, { shouldValidate: true })
        }
        error={errors.estado?.message}
      />
      <div className="col-span-2">
        <Input
          label="Endereço"
          placeholder="Digite o endereço"
          value={watch("endereco")}
          onChange={(value) => setValue("endereco", value)}
          error={errors.endereco?.message}
        />
      </div>
      <div className="col-span-2">
        <Input
          label="Complemento"
          placeholder="Digite o complemento"
          value={watch("complemento")}
          onChange={(value) => setValue("complemento", value)}
          error={errors.complemento?.message}
        />
      </div>
    </div>
  );

  const addClientsContent = (
    <div className="mt-6">
      {!isConsultor ? (
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
          onChange={(values) =>
            setValue("clientesIds", values, { shouldValidate: true })
          }
          error={errors.clientesIds?.message}
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

  return (
    <BaseLayout
      width="900px"
      headerContent={
        <div className="flex gap-4">
          <Button
            text={saving ? "Criando..." : "Criar Usuário"}
            variant="primary"
            rounded={true}
            onClick={handleSubmit(onSubmit)}
            disabled={saving}
          />
        </div>
      }
    >
      <div className="bg-gray-950 rounded-lg p-8">
        <Title text="Criar Usuário" />
        <div className="space-y-6">
          <SingleSelect
            label="Tipo do usuário"
            options={userTypeOptions}
            value={watch("isConsultor") ? "consultor" : "cliente"}
            onChange={(value) =>
              setValue("isConsultor", value === "consultor", {
                shouldValidate: true,
              })
            }
            placeholder="Selecione o tipo de usuário"
            error={errors.isConsultor?.message}
          />

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Nome"
              placeholder="Digite o nome"
              value={watch("nome")}
              onChange={(value) => setValue("nome", value)}
              error={errors.nome?.message}
            />
            <Input
              label="Telefone"
              placeholder="(00) 00000-0000"
              type="tel"
              value={watch("telefone")}
              onChange={(value) =>
                setValue("telefone", maskPhone(value), { shouldValidate: true })
              }
              error={errors.telefone?.message}
            />
          </div>

          <Input
            label="Email"
            placeholder="Digite o email"
            type="email"
            value={watch("email")}
            onChange={(value) => setValue("email", value)}
            error={errors.email?.message}
          />

          <Tabs tabs={subTabs} />
        </div>
      </div>
    </BaseLayout>
  );
};

export default UserCreate;
