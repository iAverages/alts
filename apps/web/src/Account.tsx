import { useParams } from "@solidjs/router";
import clsx from "clsx";
import { Component, createSignal, splitProps } from "solid-js";
import { Show } from "solid-js";

import { trpc } from "./trpc";

const Box = (props: any) => {
    const [local, rest] = splitProps(props, ["class"]);

    return <div class={clsx("p-4 bg-black rounded-md", local.class)}>{rest.children}</div>;
};

type Params = {
    id: string;
};

const App: Component = () => {
    const params = useParams<Params>();
    const account = trpc.bot.getAccount.useQuery(() => params.id);
    const servers = trpc.bot.listServer.useQuery();
    const [server, setServer] = createSignal("");
    const botStart = trpc.bot.create.useMutation();
    const botStop = trpc.bot.stop.useMutation();

    return (
        <div class="m-6">
            <header class="flex gap-4">Account - {account.data?.account.name}</header>
            <p>{account.data?.account.email}</p>
            <select onChange={(val) => setServer(val.currentTarget.value)}>
                {servers.data?.map((server) => (
                    <option value={server.id}>{server.name}</option>
                ))}
            </select>
            <button onClick={() => botStart.mutate({ accountId: params.id, serverId: server() })}>Start</button>
            <Show when={account.data?.bot}>
                <Box>
                    <p>Bot is running</p>
                    <button onClick={() => botStop.mutate(params.id)}>Stop</button>
                </Box>
            </Show>
        </div>
    );
};

export default App;
