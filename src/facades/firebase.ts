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
  doc,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
} from "firebase/storage";
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
const storage = getStorage(app);

const firebase = {
  app,
  auth,
  getDoc: (collectionName: string, id: string) =>
    getDoc(doc(firestore, collectionName, id)),

  collectionNames: {
    system: "System",
    profiles: "Profiles",
    pictures: "Pictures",
    criteriaScores: "CriteriaScores",
    reports: "Reports",
  },

  collections: {
    system: () => collection(firestore, "System"),
    profiles: () => collection(firestore, "Profiles"),
    pictures: () => collection(firestore, "Pictures"),
    criteriaScores: () => collection(firestore, "CriteriaScores"),
    reports: () => collection(firestore, "Reports"),
  },

  storageRef: (url: string) => ref(storage, url),
}

export default firebase;
