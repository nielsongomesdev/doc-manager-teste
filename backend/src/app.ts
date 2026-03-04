import fastify from "fastify";

export const app = fastify();

app.get("/ping", async (request, reply) => {
  return { message: "pong, servidor rodando perfeitamente!" };
});
