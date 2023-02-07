import { defineConfig } from "tsup";

export default defineConfig({
    entryPoints: ["src/index.ts"],
    skipNodeModulesBundle: true,
    format: ["esm"],
    clean: true,
    sourcemap: true,
    target: "node18",
    noExternal: ["@alts/db", "@alts/trpc", "@alts/bot"],
});
