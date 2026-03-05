import { describe, it, expect, vi, beforeEach } from "vitest";
import { DocumentService } from "./document.service";

vi.mock("@/utils/prisma", () => ({
  prisma: {
    documento: {
      create: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

import { prisma } from "@/utils/prisma";

describe("DocumentService", () => {
  let service: DocumentService;

  beforeEach(() => {
    service = new DocumentService();
    vi.clearAllMocks();
  });

  it("deve criar um novo documento corretamente", async () => {
    // Cenário
    const inputData = {
      title: "Contrato Social",
      description: "Primeira versão",
    };
    const mockDocumentoCriado = {
      id: "uuid-123",
      titulo: "Contrato Social",
      descricao: "Primeira versão",
      status: "pendente", // status padrão
      criado_em: new Date(),
    };

    (prisma.documento.create as any).mockResolvedValue(mockDocumentoCriado);

    const result = await service.create(inputData);

    expect(prisma.documento.create).toHaveBeenCalledTimes(1);
    expect(prisma.documento.create).toHaveBeenCalledWith({
      data: {
        titulo: inputData.title,
        descricao: inputData.description,
      },
    });
    expect(result).toEqual(mockDocumentoCriado);
  });

  it("deve listar todos os documentos", async () => {
    const mockDocumentos = [
      { id: "1", titulo: "Doc 1", status: "pendente", criado_em: new Date() },
      { id: "2", titulo: "Doc 2", status: "assinado", criado_em: new Date() },
    ];
    (prisma.documento.findMany as any).mockResolvedValue(mockDocumentos);

    const result = await service.list();

    expect(prisma.documento.findMany).toHaveBeenCalledWith({
      orderBy: { criado_em: "desc" },
    });
    expect(result).toHaveLength(2);
    expect(result[0].titulo).toBe("Doc 1");
  });
});
