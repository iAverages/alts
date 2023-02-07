import type { Bot } from "mineflayer";

const onError = async (bot: Bot) => {
    console.log(`${bot.username} encountered an error!`);
};

export default onError;
