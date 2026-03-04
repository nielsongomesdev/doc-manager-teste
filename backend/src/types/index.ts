export interface CreateDocumentData {
  title: string;
  description?: string;
}

export interface UpdateDocumentStatusData {
  id: string;
  status: "pendente" | "assinado";
}
