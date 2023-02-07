import { createTRPCRouter, publicProcedure } from "../trpc";
import { createBot } from "@alts/bot";
import { z } from "zod";
import type { Bot, BotOptions } from "mineflayer";
import { Account, Server } from "@alts/db";

const bots = new Map<string, Bot>();

export const botRouter = createTRPCRouter({
    getAccount: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
        const account = await ctx.prisma.account.findUnique({
            where: {
                id: input,
            },
        });

        if (!account) return null;
        return { account, bot: !!bots.has(input) } as { account: Account; bot: boolean };
    }),
    listAccounts: publicProcedure.query(async ({ ctx }) => {
        const accounts = await ctx.prisma.account.findMany();
        // idk why i need to cast the types to what they already are
        // something is brokn, not sure why
        return accounts as Account[];
    }),
    listServer: publicProcedure.query(async ({ ctx }) => {
        const servers = await ctx.prisma.server.findMany();
        return servers as Server[];
    }),
    listRunningBots: publicProcedure.query(async ({ ctx }) => {
        const data = Object.fromEntries(bots.entries());
        return data as typeof data;
    }),
    create: publicProcedure
        .input(
            z.object({
                serverId: z.string(),
                accountId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            console.log("Creating bot");
            const _server = await ctx.prisma.server.findUnique({
                where: {
                    id: input.serverId,
                },
            });

            const _account = await ctx.prisma.account.findUnique({
                where: {
                    id: input.accountId,
                },
            });

            const error: Record<string, string | null> = { server: null, account: null };

            if (!_account) {
                error.account = "Account not found";
            }

            if (!_server) {
                error.server = "Server not found";
            }

            if (Object.values(error).some((v) => !!v)) return { error };

            // tells TS that these are not null
            const server = _server!;
            const account = _account!;

            const options: BotOptions = {
                host: server.host,
                port: server.port,
                username: account.email,
                password: account.password,
                auth: "microsoft",
                version: server.version,
            };

            const bot = createBot(options);

            bots.set(input.accountId, bot);
            console.log("Created bot");
            return { error: null };
        }),
    stop: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        const bot = bots.get(input);
        if (!bot) return { error: "Bot not found" };
        bot.end();
        bots.delete(input);
        return { error: null };
    }),
});
