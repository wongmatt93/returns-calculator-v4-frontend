import { User } from "firebase/auth";
import { createContext } from "react";
import Dividend from "../models/Dividend";
import Stock from "../models/Stock";
import StockPurchase from "../models/StockPurchase";
import StockSale from "../models/StockSale";
import UserProfile from "../models/UserProfile";

export interface AuthContextModel {
  user: User | null; // null when not logged in
  currentUserProfile: UserProfile | undefined;
  stocks: Stock[];
  addStock: (stock: Stock, uid: string) => void;
  buyShares: (uid: string, ticker: string, purchase: StockPurchase) => void;
  sellShares: (uid: string, ticker: string, sale: StockSale) => void;
  addDividend: (uid: string, ticker: string, dividend: Dividend) => void;
}

const defaultValue: AuthContextModel = {
  user: null,
  currentUserProfile: undefined,
  stocks: [],
  addStock: () => {},
  buyShares: () => {},
  sellShares: () => {},
  addDividend: () => {},
};

const AuthContext = createContext(defaultValue);
export default AuthContext;
