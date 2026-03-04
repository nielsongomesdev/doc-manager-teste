import fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import scalar from "@scalar/fastify-api-reference";
import { documentRoutes } from "@/routes/document.routes";

export const app = fastify();

app.register(cors, {
  origin: true,
});

app.register(swagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "API - Gerenciador de Documentos",
      version: "1.0.0",
    },
  },
});

app.register(scalar, {
  routePrefix: "/docs",
  configuration: {
    theme: "purple",
  },
});

app.register(documentRoutes);

app.get("/ping", async (request, reply) => {
  return { message: "pong, servidor rodando perfeitamente!" };
});
