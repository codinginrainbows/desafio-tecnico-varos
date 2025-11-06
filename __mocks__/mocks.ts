import { Column } from "@/components/ds/table/header/Index";
import type { SingleSelectOption } from "@/components/ds/select/single-select/Index";

export const columns: Column[] = [
  { key: "nome", label: "Nome" },
  { key: "email", label: "Email" },
  { key: "telefone", label: "Telefone" },
  { key: "cpf", label: "CPF" },
  { key: "idade", label: "Idade" },
  { key: "endereco", label: "Endereço" },
  { key: "createdAt", label: "Criado em" },
  { key: "updatedAt", label: "Atualizado em" },
];

export const data = [
  {
    nome: "John Doe",
    email: "johndoe@gmail.com",
    telefone: "(00) 00000-0000",
    cpf: "000.000.000-00",
    idade: "28 anos",
    endereco: "Lorem ipsum dolor...",
    criadoEm: "08/05/2024 às 8:20h",
    atualizadoEm: "08/05/2024 às 9:20h",
  },
  {
    nome: "John Doe",
    email: "johndoe@gmail.com",
    telefone: "(00) 00000-0000",
    cpf: "000.000.000-00",
    idade: "28 anos",
    endereco: "Lorem ipsum dolor...",
    criadoEm: "08/05/2024 às 8:20h",
    atualizadoEm: "08/05/2024 às 9:20h",
  },
  {
    nome: "John Doe",
    email: "johndoe@gmail.com",
    telefone: "(00) 00000-0000",
    cpf: "000.000.000-00",
    idade: "28 anos",
    endereco: "Lorem ipsum dolor...",
    criadoEm: "08/05/2024 às 8:20h",
    atualizadoEm: "08/05/2024 às 9:20h",
  },
];

// Opções para User Upsert
export const userTypeOptions: SingleSelectOption[] = [
  { value: "consultor", label: "Consultor" },
  { value: "admin", label: "Administrador" },
  { value: "usuario", label: "Usuário" },
];

export const stateOptions: SingleSelectOption[] = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

export const clientOptions: SingleSelectOption[] = [
  { value: "john", label: "John Doe" },
  { value: "licon", label: "Licon Doe" },
  { value: "steve", label: "Steve Doe" },
  { value: "matt", label: "Matt Doe" },
  { value: "anna", label: "Anna Smith" },
  { value: "peter", label: "Peter Johnson" },
];

// Opções para Filters
export const consultorNameOptions: SingleSelectOption[] = [
  { value: "john", label: "John Doe" },
  { value: "jane", label: "Jane Smith" },
  { value: "bob", label: "Bob Johnson" },
];

export const consultorEmailOptions: SingleSelectOption[] = [
  { value: "john@example.com", label: "johndoe@gmail.com" },
  { value: "jane@example.com", label: "janesmith@gmail.com" },
  { value: "bob@example.com", label: "bob@gmail.com" },
];
