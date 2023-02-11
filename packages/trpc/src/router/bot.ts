import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { Account, Server } from "@alts/db";
import { botManager } from "@alts/bot";

export const botRouter = createTRPCRouter({
    getAccount: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
        const account = await ctx.prisma.account.findUnique({
            where: {
                id: input,
            },
        });

        if (!account) return null;
        return { account, bot: !!botManager.bots.has(input) } as { account: Account; bot: boolean };
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
        const data = [...botManager.bots.keys()];
        const dbRows = await ctx.prisma.account.findMany({
            where: {
                id: {
                    in: data,
                },
            },
        });
        const constructed = dbRows.map((row) => ({ account: row, data: botManager.getBot(row.id) }));
        type A = typeof constructed;
        return constructed as A;
    }),
    getBotData: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
        const bot = botManager.getBot(input);
        if (!bot) return null;
        return bot._data;
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

            botManager.createBot(server, account);
            console.log("Created bot");
            return { error: null };
        }),
    stop: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        const result = botManager.stopBot(input);
        return { error: result ? null : "Bot not found" };
    }),
});
