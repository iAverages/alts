import { createEmbed, webhookClient } from "../manager";
import type { ChatMessage } from "prismarine-chat";
import { RunningAlt } from "../type";

// tmp
const allowTP = ["iAverage", "Royhal", "Klue", "Wosek"];

const isAllowedTP = (message: string) => {
    return allowTP.some((name) => {
        return message.includes(name);
    });
};

const onMessage = (bot: RunningAlt, message: string, position: string, jsonMsg: ChatMessage) => {
    bot.log(`[${new Date().toDateString()}] ${message}`);
    if (message.includes("has requested that you teleport to them") && isAllowedTP(message)) {
        bot.chat("/tpaccept");
        console.log("Teleport accepted");
        webhookClient.send({
            embeds: [createEmbed(bot.username, `${bot.username} Teleported to `, "#ff3434")],
        });
    }
};

export default onMessage;
