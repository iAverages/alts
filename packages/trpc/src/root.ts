import { botRouter } from "./router/bot";
import { devRouter } from "./router/dev";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
    dev: devRouter,
    bot: botRouter,
});

// export type definition of API
export type AppRouterType = typeof appRouter;
