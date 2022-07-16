import { defineConfig, loadEnv } from "vite"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return defineConfig({
      publicDir: "assets",
      resolve: {
        alias: {
          "@": resolve(__dirname, "src"),
        },
      },
      plugins: [vue()],
      define: {
        globalEnv: env,
      },
    });
}
