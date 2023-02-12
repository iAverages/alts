import { webhookClient, createEmbed } from "../manager";
import type { Bot } from "mineflayer";

const onError = async (bot: Bot, error: Error) => {
    console.log(error);
    webhookClient.send({
        embeds: [createEmbed(bot.username, `${bot.username} error!, ${error.message}`, "#ff3434")],
    });
};

export default onError;
