import { ReactNode, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import UserProfile from "../models/UserProfile";
import {
  addNewProfile,
  addNewStock,
  getAllProfiles,
} from "../services/userProfileService";
import { User } from "firebase/auth";
import Stock from "../models/Stock";

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [currentUserProfile, setCurrentUserProfile] = useState<
    UserProfile | undefined
  >(undefined);
  const [stocks, setStocks] = useState<Stock[]>([]);

  const addStock = (stock: Stock, uid: string) =>
    addNewStock(stock, uid).then(() =>
      getAllProfiles().then((response) => setProfiles(response))
    );

  useEffect(() => {
    // useEffect to only register once at start
    return auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
  }, []);

  useEffect(() => {
    user && getAllProfiles().then((response) => setProfiles(response));
  }, [user]);

  useEffect(() => {
    if (user && profiles) {
      const found: UserProfile | undefined = profiles.find(
        (profile) => profile.uid === user.uid
      );
      if (found) {
        setCurrentUserProfile(found);
      } else {
        const newUser: UserProfile = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          uid: user.uid,
          stocks: [],
        };
        addNewProfile(newUser).then(() => setCurrentUserProfile(newUser));
      }
    }
  }, [profiles]);

  useEffect(() => {
    currentUserProfile && setStocks(currentUserProfile.stocks);
  }, [currentUserProfile]);

  return (
    <AuthContext.Provider
      value={{ user, currentUserProfile, stocks, addStock }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
