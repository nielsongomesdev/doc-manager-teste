import { FastifyRequest, FastifyReply } from "fastify";
import { DocumentService } from "@/services/document.service";

const documentService = new DocumentService();

export class DocumentController { async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { title, description } = request.body as {
        title: string;
        description?: string;
      };

      if (!title) {
        return reply
          .status(400)
          .send({ error: "O campo título é obrigatório." });
      }

      const document = await documentService.create({ title, description });

      return reply.status(201).send(document);
    } catch (error) {
      console.error("Erro ao criar documento:", error);
      return reply
        .status(500)
        .send({ error: "Erro interno ao criar o documento." });
    }
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      const documents = await documentService.list();
      return reply.send(documents);
    } catch (error) {
      console.error("Erro ao listar documentos:", error);
      return reply
        .status(500)
        .send({ error: "Erro interno ao listar os documentos." });
    }
  }
}
