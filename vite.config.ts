import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
//import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return defineConfig({
      publicDir: "assets",
      resolve: {
        alias: {
          "@": resolve(__dirname, "src"),
        },
      },
      plugins: [
        vue(),
        //quasar({
        //  sassVariables: 'src/quasar-variables.sass'
        //})
      ],
      define: {
        globalEnv: env,
      },
    });
}
