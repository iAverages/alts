import sourceMapSupport from "source-map-support";
sourceMapSupport.install();
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { appRouter, createContext } from "@alts/trpc";
import { createBot } from "@alts/bot";
import { BotOptions } from "mineflayer";
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
server.post("/get", async (req) => {
    const a = req.body as BotOptions;

    createBot(a);
});

(async () => {
    try {
        await server.listen({ port: 3001 });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
})();
