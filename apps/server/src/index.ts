import sourceMapSupport from "source-map-support";
sourceMapSupport.install();
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { appRouter, createContext } from "@alts/trpc";
import cors from "@fastify/cors";

const server = fastify({
    maxParamLength: 5000,
});

server.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: { router: appRouter, createContext },
});
await server.register(cors, {
    origin: "*",
});

(async () => {
    try {
        await server.listen({ port: 3001 });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
})();
