import { prisma } from "@/utils/prisma";
import { CreateDocumentData, UpdateDocumentStatusData } from "@/types";

export class DocumentService { async create(data: CreateDocumentData) {
    return await prisma.documento.create({
      data: {
        titulo: data.title,
        descricao: data.description,
      },
    });
  }

  async list() {
    return await prisma.documento.findMany({
      orderBy: { criado_em: "desc" },
    });
  }

  async updateStatus(data: UpdateDocumentStatusData) {
    return await prisma.documento.update({
      where: { id: data.id },
      data: { status: data.status },
    });
  }

  async delete(id: string) {
    return await prisma.documento.delete({
      where: { id },
    });
  }
}
