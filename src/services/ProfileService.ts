import {
  Profile,
} from "../models";
import firebase from "@/facades/firebase";
import {
  getDocs} from "firebase/firestore"; 

class ProfileService {
  getProfiles = async (): Promise<Profile[]> => {
    const profilesCollection = firebase.collections.profiles();
  
    const snapshot = await getDocs(profilesCollection);
    const profiles = snapshot.docs.map((doc) => Profile.fromMap(doc.id, doc.data()));
    return profiles;
  };
}

const service = new ProfileService();
export default service;
