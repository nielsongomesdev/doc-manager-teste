import { prisma } from "@/utils/prisma";
import { CreateDocumentData } from "@/types";

export class DocumentService { async create(data: CreateDocumentData) {
    const document = await prisma.documento.create({
      data: {
        titulo: data.title,
        descricao: data.description,
      },
    });

    return document;
  }

  async list() {
    const documents = await prisma.documento.findMany({
      orderBy: {
        criado_em: "desc",
      },
    });

    return documents;
  }
}
