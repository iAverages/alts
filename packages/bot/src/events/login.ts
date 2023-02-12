import { createEmbed, webhookClient } from "../manager";
import { RunningAlt } from "../type";
import { wait } from "../utils";

const onLogin = async (bot: RunningAlt) => {
    bot.log("Bot logged in");
    if (bot._data.networkServer === "survival") return;
    bot.log(`connected to ${bot._data.server.host} (${bot._data.server.id})!`);
    webhookClient.send({ embeds: [createEmbed(bot.username, "Bot logged in", "#2fec00")] });
    await wait(1000);
    bot.chat("/server survival");
    bot._data.networkServer = "survival";
    bot.log("Moved to survival");

    // Make bot join survival every 5 minutes
    setInterval(() => bot.chat("/server survival"), 1000 * 60 * 5);
};

export default onLogin;
