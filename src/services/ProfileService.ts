import {
  Picture,
  Profile,
  Report,
} from "../models";
import firebase from "@/facades/firebase";
import {
  getDocs, query, where,
} from "firebase/firestore"; 
import { nameof } from "@/utils";

class ProfileService {
  getProfiles = async (): Promise<Profile[]> => {
    const profilesCollection = firebase.collections.profiles();
  
    const snapshot = await getDocs(profilesCollection);
    const profiles = snapshot.docs
      .map((doc) => Profile.fromMap(doc.id, doc.data()));
    return profiles;
  };

  getReports = async (): Promise<Report[]> => {
    const reportsCollection = firebase.collections.reports();
  
    const snapshot = await getDocs(reportsCollection);
    const reports = snapshot.docs
      .map((doc) => Report.fromMap(doc.id, doc.data()));
    return reports;
  };

  getPicture = async (
    pictureId: string,
  ): Promise<Picture> => {
    const snapshot = await firebase.getDoc(
      firebase.collectionNames.pictures,
      pictureId);
    const picture = Picture.fromMap(snapshot.id, snapshot.data()!);
    return picture;
  };
}

const service = new ProfileService();
export default service;
