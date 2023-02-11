import sourceMapSupport from "source-map-support";
sourceMapSupport.install();
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { appRouter, createContext } from "@alts/trpc";
import cors from "@fastify/cors";
import fastifyStaticPlugin from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = fileURLToPath(new URL(".", import.meta.url));

const server = fastify({
    maxParamLength: 5000,
    logger: true,
});

server.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: { router: appRouter, createContext },
});
await server.register(cors, {
    origin: "*",
});

server.register(fastifyStaticPlugin, {
    root: path.join(__dirname, "public"),
    prefix: "/",
    list: true,
});

server.setNotFoundHandler((_req, res) => {
    res.sendFile("index.html");
});

(async () => {
    try {
        server.log.info("Starting server");
        await server.listen({ port: 3001, host: "0.0.0.0" });
        server.log.info(`Server listening on ${server.server.address()}`);
    } catch (err) {
        server.log.error(err);
        console.error(err);
        process.exit(1);
    }
})();
