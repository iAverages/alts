import { useNavigate } from "@solidjs/router";
import clsx from "clsx";
import { Component, splitProps } from "solid-js";
import { trpc } from "./trpc";

const Box = (props: any) => {
    const [local, rest] = splitProps(props, ["class"]);

    return (
        <div class={clsx("p-4 bg-black rounded-md", local.class)} {...rest}>
            {rest.children}
        </div>
    );
};

const App: Component = () => {
    const navigate = useNavigate();
    const accounts = trpc.bot.listAccounts.useQuery();
    const servers = trpc.bot.listServer.useQuery();
    const runningBots = trpc.bot.listRunningBots.useQuery();

    return (
        <div class="m-6">
            <header class="flex gap-4">
                <div class="flex gap-2 flex-col">
                    <h2>Accounts</h2>
                    {accounts.data?.map((account) => (
                        <Box onClick={() => navigate(`/account/${account.id}`)} class="hover:cursor-pointer">
                            <p>{account.name}</p>
                            <p>{account.email}</p>
                        </Box>
                    ))}
                </div>

                <div class="flex gap-2 flex-col">
                    <h2>Servers</h2>
                    {servers.data?.map((account) => (
                        <Box>
                            <h1>{account.name}</h1>
                            <h2>
                                {account.host}
                                {account.port === 25565 ? "" : `:${account.port}`}
                            </h2>
                        </Box>
                    ))}
                </div>

                <div class="flex gap-2 flex-col">
                    <h2>Running</h2>
                    {Object.entries(runningBots.data ?? []).map(([key, bot]) => (
                        <Box>
                            <p>{bot.username}</p>
                        </Box>
                    ))}
                </div>
            </header>
        </div>
    );
};

export default App;
