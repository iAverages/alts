import { RunningAlt } from "../type";
import { wait } from "../utils";

const onLogin = async (bot: RunningAlt) => {
    if (bot._data.networkServer === "survival") return;
    bot.log(`connected to ${bot._data.host} (${bot._data.serverId})!`);
    await wait(1000);
    bot.chat("/server survival");
    bot._data.networkServer = "survival";
    bot.log("Moved to survival");

    // Make bot join survival every 5 minutes
    setInterval(() => bot.chat("/server survival"), 1000 * 60 * 5);
};

export default onLogin;
