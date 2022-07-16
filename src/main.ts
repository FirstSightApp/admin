import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import firebase from "firebase/app";
import env from "./Env";

var firebaseConfig = {
  apiKey: env.variables.apiKey(),
  //authDomain: "AUTH_DOMAIN",
  projectId: env.variables.projectId(),
  storageBucket: env.variables.storageBucket(),
  messagingSenderId: env.variables.messagingSenderId(),
  appId: env.variables.appId(),
};
firebase.initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router);
app.mount("#app");
