// Init facades.
import "@/facades/firebase";

// Import UI.
import { router } from "@/router";
import { createApp } from "vue";
import App from "@/App.vue";
import { Quasar } from "quasar";

// Icon libraries and Quasar css.
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass"

const app = createApp(App);

app.use(router);
app.use(Quasar, {
  plugins: {},
});

app.mount("#app");
