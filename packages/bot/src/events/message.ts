import type { ChatMessage } from "prismarine-chat";
import { RunningAlt } from "../type";

const onMessage = (bot: RunningAlt, message: string, position: string, jsonMsg: ChatMessage) => {
    bot.log(`[${new Date().toDateString()}] ${message}`);
    if (message.includes("has requested that you teleport to them")) {
        bot.chat("/tpaccept");
        console.log("Teleport accepted");
    }
};

export default onMessage;
