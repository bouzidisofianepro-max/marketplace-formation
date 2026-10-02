import path from "path";
import { loadEnvConfig } from "@next/env";

export function createNextConfig(appDirname) {
  const root = path.join(appDirname, "../..");
  loadEnvConfig(root);

  return {
    transpilePackages: [
      "@marketplace/ui",
      "@marketplace/data",
      "@marketplace/tracking",
      "@marketplace/seo",
      "@marketplace/config",
    ],
    outputFileTracingRoot: root,
    turbopack: {
      root,
    },
  };
}
