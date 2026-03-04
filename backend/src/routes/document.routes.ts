import { FastifyInstance } from "fastify";
import { DocumentController } from "@/controllers/document.controller";

const documentController = new DocumentController();

export async function documentRoutes(app: FastifyInstance) {
  app.post("/documents", documentController.create);
  app.get("/documents", documentController.list);
}
