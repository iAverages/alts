import { RunningAlt } from "./type";
import { createBot as _createBot } from "./bot";
import { Account, Server } from "@alts/db";
import type { BotOptions } from "mineflayer";
import { wait } from "./utils";

export const bots = new Map<string, RunningAlt>();

export const getBot = (id: string) => bots.get(id);

export const getBots = (ids: string[]) => {
    return ids.map((id) => ({ account: { id }, data: bots.get(id) }));
};

export const stopBot = (id: string) => {
    const bot = bots.get(id);
    if (!bot) return false;
    bot._data.restart = false;
    bot.end();
    return true;
};

export const createBot = (server: Server, account: Account) => {
    const options: BotOptions & { serverId: string; host: string } = {
        host: server.host,
        port: server.port,
        username: account.email,
        password: account.password,
        auth: "microsoft",
        version: server.version,
        serverId: server.id,
    };

    const bot = _createBot(options);
    bot.on("end", async () => {
        bots.delete(account.id);
        if (bot._data.restart) {
            console.log("Bot ended, creating new isntance in 20 seconds");
            await wait(1000 * 20); // wait 20 seconds
            createBot(server, account);
        } else {
            console.log("Bot ended, not restarting");
        }
    });

    bots.set(account.id, bot);
    console.log("Created bot");
};
