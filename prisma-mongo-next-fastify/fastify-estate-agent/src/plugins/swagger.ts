import fp from "fastify-plugin";
import swagger, { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import swaggerUi from '@fastify/swagger-ui'
export default fp<FastifyDynamicSwaggerOptions>(async (fastify, opts) => {
  fastify.register(swagger, {
    swagger: {
      info: {
        title: "Fastify Dynamic Swagger",
        version: "1.0.0"
      },
      host: "localhost",
      basePath: "/",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"]
    }
  });
  fastify.register(swaggerUi);
});

//
