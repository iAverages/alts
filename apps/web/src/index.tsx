/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { client, queryClient, trpc } from "./trpc";
import { Route, Router, Routes } from "@solidjs/router";
import Account from "./Account";
import { MatchFilters } from "@solidjs/router/dist/types";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?"
    );
}

render(
    () => (
        <trpc.Provider client={client} queryClient={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/account/:id" element={<Account />} />
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </Router>
        </trpc.Provider>
    ),
    root!
);
