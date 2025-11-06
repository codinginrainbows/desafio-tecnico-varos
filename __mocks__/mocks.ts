import { Column } from "@/components/ds/table/header/Index";
import type { SingleSelectOption } from "@/components/ds/select/single-select/Index";

export const columns: Column[] = [
  { key: "nome", label: "Nome" },
  { key: "email", label: "Email" },
  { key: "telefone", label: "Telefone" },
  { key: "cpf", label: "CPF" },
  { key: "idade", label: "Idade" },
  { key: "endereco", label: "Endereço" },
  { key: "criadoEm", label: "Criado em" },
  { key: "atualizadoEm", label: "Atualizado em" },
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
  { value: "sp", label: "São Paulo" },
  { value: "rj", label: "Rio de Janeiro" },
  { value: "mg", label: "Minas Gerais" },
  { value: "ba", label: "Bahia" },
  { value: "pr", label: "Paraná" },
  { value: "sc", label: "Santa Catarina" },
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
