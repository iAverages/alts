import type { Bot } from "mineflayer";
import type { ChatMessage } from "prismarine-chat";

const onMessage = (bot: Bot, message: string, position: string, jsonMsg: ChatMessage) => {
    console.log(`[${bot.username}] ${message}`);
    if (message.includes("has requested that you teleport to them")) {
        bot.chat("/tpaccept");
        console.log("Teleport accepted");
    }
};

export default onMessage;
