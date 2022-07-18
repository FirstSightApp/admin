import { Err } from "@/Err";
import {
  FirebaseApp,
  initializeApp,
} from "firebase/app";
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import env from "../env";
import { User } from "../models";

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

class FirebaseFacade {
  signIn = async (
    email: string,
    password: string,
  ): Promise<User | Err> => {
    let userCreds: UserCredential | undefined;
    try {
      userCreds = await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.log("error signin in", error);
      switch (error.code) {
        case "auth/invalid-email":
          return new Err(null, "Invalid email");
        case "auth/user-not-found":
          return new Err(null, "No account with that email was found");
        case "auth/wrong-password":
          return new Err(null, "Incorrect password");
        default:
          return new Err(null, "Email or password was incorrect");
      };
    }

    if (!userCreds || !userCreds.user) {
      return new Err(null, "Unknown error");
    }
    return new User(
      userCreds.user.uid,
      userCreds.user.email!,
    );
  };

  signOut = async () => {
    await auth.signOut();
  };
}

const facade = new FirebaseFacade();
export default facade;
