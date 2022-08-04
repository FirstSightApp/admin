import {
  FirebaseApp,
  initializeApp,
} from "firebase/app";
import {
  Auth,
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
  collection,
} from "firebase/firestore";
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
const firestore = getFirestore(app);

const firebase = {
  app,
  auth,
  collections: {
    system: () => collection(firestore, "System"),
    profiles: () => collection(firestore, "Profiles"),
    pictures: () => collection(firestore, "Pictures"),
    criteriaScores: () => collection(firestore, "CriteriaScores"),
    reports: () => collection(firestore, "Reports"),
  },
}

export default firebase;
