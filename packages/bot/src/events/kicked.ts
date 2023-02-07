import type { Bot } from "mineflayer";

const onKick = async (bot: Bot, reason: string) => {
    console.log(`${bot.username} was kicekd, reconnecting...`, reason);
};

export default onKick;
