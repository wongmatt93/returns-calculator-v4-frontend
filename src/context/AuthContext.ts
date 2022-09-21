import { User } from "firebase/auth";
import { createContext } from "react";
import Stock from "../models/Stock";
import UserProfile from "../models/UserProfile";

export interface AuthContextModel {
  user: User | null; // null when not logged in
  currentUserProfile: UserProfile | undefined;
  stocks: Stock[];
  addStock: (stock: Stock, uid: string) => void;
}

const defaultValue: AuthContextModel = {
  user: null,
  currentUserProfile: undefined,
  stocks: [],
  addStock: () => {},
};

const AuthContext = createContext(defaultValue);
export default AuthContext;
