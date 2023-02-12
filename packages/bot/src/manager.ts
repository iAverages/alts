import { BotOptions, RunningAlt } from "./type";
import { createBot as _createBot } from "./bot";
import { Account, Server } from "@alts/db";
import { ColorResolvable, EmbedBuilder, WebhookClient } from "discord.js";

export const webhookClient = new WebhookClient({
    id: process.env.DISCORD_WEBHOOK_ID ?? "",
    token: process.env.DISCORD_WEBHOOK_TOKEN ?? "",
});

export const createEmbed = (bot: string, text: string, color: ColorResolvable) => {
    return new EmbedBuilder()
        .setAuthor({
            name: text,
            iconURL: `https://skins.danielraybone.com/v1/head/${bot}`,
        })
        .setColor(color)
        .setTimestamp();
};

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
    const options: BotOptions = {
        host: server.host,
        port: server.port,
        username: account.email,
        password: account.password,
        auth: "microsoft",
        version: server.version,
        server: server,
        account: account,
    };

    const bot = _createBot(options);
    bots.set(account.id, bot);
    console.log("Created bot");
};
