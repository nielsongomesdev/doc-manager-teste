import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DocumentService } from './document.service';

const mockPrisma = {
  documento: {
    create: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

vi.mock('@/utils/prisma', () => ({
  prisma: mockPrisma,
}));

describe('DocumentService', () => {
  let service: DocumentService;

  beforeEach(() => {
    service = new DocumentService();
    vi.clearAllMocks();
  });

  it('deve criar um documento com sucesso', async () => {
    const documentData = {
      title: 'Documento Teste',
      description: 'Descrição do teste',
    };

    const expectedResult = {
      id: '123',
      titulo: documentData.title,
      descricao: documentData.description,
      status: 'pendente',
      criado_em: new Date(),
    };

    mockPrisma.documento.create.mockResolvedValue(expectedResult);

    const result = await service.create(documentData);

    expect(result).toEqual(expectedResult);
    expect(mockPrisma.documento.create).toHaveBeenCalledWith({
      data: {
        titulo: documentData.title,
        descricao: documentData.description,
      },
    });
  });

  it('deve listar documentos ordenados por data de criação', async () => {
    const mockDocuments = [
      { id: '1', titulo: 'Doc 1', status: 'pendente', criado_em: new Date() },
      { id: '2', titulo: 'Doc 2', status: 'assinado', criado_em: new Date() },
    ];

    mockPrisma.documento.findMany.mockResolvedValue(mockDocuments);

    const result = await service.list();

    expect(result).toEqual(mockDocuments);
    expect(mockPrisma.documento.findMany).toHaveBeenCalledWith({
      orderBy: { criado_em: 'desc' },
    });
  });
});
