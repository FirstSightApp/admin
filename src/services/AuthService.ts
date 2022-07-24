import { Err } from "@/Err";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { User } from "../models";
import firebase from "@/facades/firebase";

class FirebaseService {
  getUser = (): User | null => {
    //await firebase.auth.updateCurrentUser(null);
    const firebaseUser = firebase.auth.currentUser;
    if (!firebaseUser) {
      return null;
    }

    return new User(
      firebaseUser.uid,
      firebaseUser.email!,
    );
  };

  signIn = async (
    email: string,
    password: string,
  ): Promise<User> => {
    let userCreds: UserCredential | undefined;
    try {
      await setPersistence(firebase.auth, browserLocalPersistence);
      userCreds = await signInWithEmailAndPassword(firebase.auth, email, password);
    } catch (error: any) {
      console.log("error signin in", error);
      switch (error.code) {
        case "auth/invalid-email":
          throw new Err(null, "Invalid email");
        case "auth/user-not-found":
          throw new Err(null, "No account with that email was found");
        case "auth/wrong-password":
          throw new Err(null, "Incorrect password");
        default:
          throw new Err(null, "Unexpected error");
      };
    }

    if (!userCreds || !userCreds.user) {
      throw new Err(null, "Unknown error");
    }

    return new User(
      userCreds.user.uid,
      userCreds.user.email!,
    );
  };

  signOut = async () => {
    await firebase.auth.signOut();
  };
}

const service = new FirebaseService();
export default service;
