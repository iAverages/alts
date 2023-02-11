import { Bot } from "mineflayer";

export type RunningAlt = {
    _data: {
        serverId: string;
        networkServer: string;
        host: string;
        allowToMove: string[];
        restart: boolean;
    };
    log: (...args: string[]) => void;
} & Bot;
