import { build } from "esbuild";

const shared = {
  bundle: true,
  entryPoints: ["src/index.ts"],
  external: ["react", "react-dom", "react/jsx-runtime"],
  logLevel: "info",
  minify: false,
  platform: "browser",
  sourcemap: true,
  target: ["es2020"],
};

await Promise.all([
  build({
    ...shared,
    outfile: "dist/index.mjs",
    format: "esm",
  }),
  build({
    ...shared,
    outfile: "dist/index.cjs",
    format: "cjs",
  }),
]);
