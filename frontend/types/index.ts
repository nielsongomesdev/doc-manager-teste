export interface Document {
  id: string;
  titulo: string;
  descricao: string;
  status: "pendente" | "assinado";
  criado_em: string;
}