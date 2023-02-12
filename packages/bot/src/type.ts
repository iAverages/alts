import { Account, Server } from "@alts/db";
import { Bot, type BotOptions as MineflayerBotOptions } from "mineflayer";

export type RunningAlt = {
    _data: {
        server: Server;
        networkServer: string;
        allowToMove: string[];
        restart: boolean;
        account: Account;
    };
    log: (...args: string[]) => void;
} & Bot;

export type BotOptions = MineflayerBotOptions & { server: Server; account: Account };
