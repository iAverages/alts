import onError from "./events/error";
import onKick from "./events/kicked";
import onLogin from "./events/login";
import onLogout from "./events/logout";
import onMessage from "./events/message";
import mineflayer from "mineflayer";

export const createBot = (connection: mineflayer.BotOptions) => {
    const bot = mineflayer.createBot(connection);
    const setup = (func: Function) => func.bind(null, bot);

    bot.on("login", setup(onLogin));
    bot.on("end", setup(onLogout));
    bot.on("messagestr", setup(onMessage));
    bot.on("kicked", setup(onKick));
    bot.on("error", setup(onError));

    return bot;
};
