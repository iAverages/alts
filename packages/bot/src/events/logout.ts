import { RunningAlt } from "../type";

const onLogout = async (bot: RunningAlt) => {
    bot.log(`disconnected from ${bot._data.host} (${bot._data.serverId})`);
};

export default onLogout;
