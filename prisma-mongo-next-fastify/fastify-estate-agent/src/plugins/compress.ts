import fp from "fastify-plugin";
import compress from '@fastify/compress'

export default fp(async (fastify, opts) => {
  fastify.register(compress);
});
