import { RunningAlt } from "../type";
import { bots, createBot, createEmbed, webhookClient } from "../manager";
import { wait } from "../utils";

const onLogout = async (bot: RunningAlt) => {
    bot.log(`disconnected from ${bot._data.server.host} (${bot._data.server.id})`);
    bots.delete(bot._data.server.id);
    if (bot._data.restart) {
        console.log("Bot ended, creating new isntance in 20 seconds");
        webhookClient.send({
            embeds: [
                createEmbed(
                    bot.username,
                    `${bot.username} instance ended, creating new isntance in 20 seconds`,
                    "#ffc500"
                ),
            ],
        });
        await wait(1000 * 20); // wait 20 seconds
        createBot(bot._data.server, bot._data.account);
    } else {
        console.log("Bot ended, not restarting");
        webhookClient.send({
            embeds: [createEmbed(bot.username, `${bot.username} instance ended, not restartings`, "#ff3434")],
        });
    }
};

export default onLogout;
