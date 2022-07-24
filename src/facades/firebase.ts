import {
  FirebaseApp,
  initializeApp,
} from "firebase/app";
import {
  Auth,
  getAuth,
} from "firebase/auth";
import env from "../env";

const firebaseConfig = {
  apiKey: env.variables.apiKey(),
  //authDomain: "AUTH_DOMAIN",
  projectId: env.variables.projectId(),
  storageBucket: env.variables.storageBucket(),
  messagingSenderId: env.variables.messagingSenderId(),
  appId: env.variables.appId(),
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

const firebase = {
  app,
  auth,
}

export default firebase;
