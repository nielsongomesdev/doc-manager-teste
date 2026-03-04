import { FastifyRequest, FastifyReply } from "fastify";
import { DocumentService } from "@/services/document.service";

const documentService = new DocumentService();

export class DocumentController {async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { title, description } = request.body as {
        title: string;
        description?: string;
      };
      if (!title)
        return reply
          .status(400)
          .send({ error: "O campo título é obrigatório." });
      const document = await documentService.create({ title, description });
      return reply.status(201).send(document);
    } catch (error) {
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
      return reply
        .status(500)
        .send({ error: "Erro interno ao listar os documentos." });
    }
  }

  async updateStatus(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const { status } = request.body as { status: string };

      if (status !== "pendente" && status !== "assinado") {
        return reply
          .status(400)
          .send({ error: 'Status inválido. Use "pendente" ou "assinado".' });
      }

      const document = await documentService.updateStatus({
        id,
        status: status as "pendente" | "assinado",
      });
      return reply.send(document);
    } catch (error) {
      return reply
        .status(500)
        .send({ error: "Erro interno ao atualizar o status." });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      await documentService.delete(id);
      return reply.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar:", error);
      return reply
        .status(500)
        .send({ error: "Erro interno ao deletar o documento." });
    }
  }
}
