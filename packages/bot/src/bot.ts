import onError from "./events/error";
import onKick from "./events/kicked";
import onLogin from "./events/login";
import onLogout from "./events/logout";
import onMessage from "./events/message";
import mineflayer from "mineflayer";
import { BotOptions, RunningAlt } from "./type";

export const createBot = (connection: BotOptions) => {
    const mineflayerBot = mineflayer.createBot(connection);
    const bot = Object.assign(mineflayerBot, {
        _data: {
            server: connection.server,
            networkServer: "",
            allowToMove: ["iAverage", "Royhal", "Klue", "Wosek"],
            restart: true,
            account: connection.account,
        },
        log: (...args: string[]) => console.log(`[${mineflayerBot.username}] ${Array.from(args).join(`,}`)}`),
    }) satisfies RunningAlt;

    const setup = (func: Function) => func.bind(null, bot);

    bot.on("login", setup(onLogin));
    bot.on("end", setup(onLogout));
    bot.on("messagestr", setup(onMessage));
    bot.on("kicked", setup(onKick));
    bot.on("error", setup(onError));

    return bot;
};
