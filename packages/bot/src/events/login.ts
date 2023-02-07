import type { Bot } from "mineflayer";
import { wait } from "../utils";
import { state } from "../state";

const onLogin = async (bot: Bot) => {
    if (state.network.survial) return;
    state.network.survial = true;
    console.log(`${bot.username} logged in!`);
    await wait(1000);
    // bot.chat("/server survival");
    console.log("Survival");
};

export default onLogin;
