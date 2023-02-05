import { EmbedBuilder, WebhookClient } from "discord.js";
import mineflayer from "mineflayer";
// @ts-ignore
import config from "../config.json";

const webhookClient = new WebhookClient({
    id: config.discord.webhook.id,
    token: config.discord.webhook.token,
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const allowTP = ["iAverage", "Royhal", "Klue"];

const isAllowedTP = (message: string) => {
    return allowTP.some((name) => {
        console.log(message.includes(name));
        return message.includes(name);
    });
};

const bot = mineflayer.createBot(config.account as mineflayer.BotOptions);
let onNetwork = false;
bot.on("login", async () => {
    if (onNetwork) return;
    onNetwork = true;

    console.log("Bot logged in!");

    const embed = new EmbedBuilder()
        .setAuthor({
            name: `${bot.username} logged into survival`,
            iconURL: `https://skins.danielraybone.com/v1/head/${bot.username}`,
        })
        .setColor("#2fec00");

    await webhookClient.send({
        embeds: [embed],
    });

    await wait(1000);
    bot.chat("/server survival");
    console.log("Survival");
});

bot.on("end", async () => {
    onNetwork = false;
    console.log("Bot logged out!");
    const embed = new EmbedBuilder()
        .setAuthor({
            name: `${bot.username} logged out`,
            iconURL: `https://skins.danielraybone.com/v1/head/${bot.username}`,
        })
        .setColor("#ff3434");

    await webhookClient.send({
        embeds: [embed],
    });
});

bot.on("messagestr", (chatMessage) => {
    console.log(chatMessage);

    if (chatMessage.includes("has requested that you teleport to them") && isAllowedTP(chatMessage)) {
        bot.chat("/tpaccept");
        console.log("Teleport accepted");
    }
});

// Log errors and kick reasons:
bot.on("kicked", console.log);
bot.on("error", console.log);
