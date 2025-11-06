import { z } from "zod";

export function maskCPF(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export function maskPhone(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4,5})(\d{4})/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
}

export function maskCEP(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
}

export function unmaskCPF(value: string): string {
  return value.replace(/\D/g, "");
}

export function unmaskPhone(value: string): string {
  return value.replace(/\D/g, "");
}

export function unmaskCEP(value: string): string {
  return value.replace(/\D/g, "");
}

export const userFormSchema = z
  .object({
    nome: z
      .string()
      .min(3, "Nome deve ter no mínimo 3 caracteres")
      .max(100, "Nome muito longo")
      .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),

    email: z
      .string()
      .min(1, "Email é obrigatório")
      .email("Email inválido")
      .toLowerCase(),

    telefone: z
      .string()
      .min(1, "Telefone é obrigatório")
      .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Formato inválido: (00) 00000-0000"),

    cpf: z
      .string()
      .min(1, "CPF é obrigatório")
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato inválido: 000.000.000-00"),

    idade: z
      .string()
      .min(1, "Idade é obrigatória")
      .refine((val) => !isNaN(Number(val)), "Deve ser um número")
      .refine((val) => Number(val) >= 18, "Idade mínima: 18 anos")
      .refine((val) => Number(val) <= 120, "Idade inválida"),

    cep: z
      .string()
      .min(1, "CEP é obrigatório")
      .regex(/^\d{5}-\d{3}$/, "Formato inválido: 00000-000"),

    estado: z
      .string()
      .min(1, "Estado é obrigatório")
      .length(2, "Selecione um estado"),

    endereco: z
      .string()
      .min(5, "Endereço deve ter no mínimo 5 caracteres")
      .max(200, "Endereço muito longo"),

    complemento: z.string().optional(),

    isConsultor: z.boolean(),

    clientesIds: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (
        data.isConsultor === true &&
        (!data.clientesIds || data.clientesIds.length === 0)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Consultor deve ter pelo menos 1 cliente vinculado",
      path: ["clientesIds"],
    }
  );

export type UserFormData = z.infer<typeof userFormSchema>;

export function applyMasksToUser(user: any) {
  return {
    ...user,
    cpf: maskCPF(user.cpf || ""),
    telefone: maskPhone(user.telefone || ""),
    cep: maskCEP(user.cep || ""),
  };
}
