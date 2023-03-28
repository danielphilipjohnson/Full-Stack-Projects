import fastify from "fastify";
import autoLoad from "@fastify/autoload";
import { join } from "path";

const server = fastify({ logger: true });

server.register(autoLoad, {
  dir: join(__dirname, "plugins")
});

server.register(autoLoad, {
  dir: join(__dirname, 'routes')
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

server.ready().then(() => {
  console.log("server is ready");
});

