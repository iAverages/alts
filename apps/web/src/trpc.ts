import { AppRouterType } from "@alts/trpc";
import { createTRPCSolid } from "solid-trpc";
import { httpBatchLink } from "@trpc/client";
import { QueryClient } from "@tanstack/solid-query";
import superjson from "superjson";

export const trpc = createTRPCSolid<AppRouterType>();

export const client = trpc.createClient({
    transformer: superjson,
    links: [
        httpBatchLink({
            url: "http://localhost:3001/trpc",
        }),
    ],
});

export const queryClient = new QueryClient();
