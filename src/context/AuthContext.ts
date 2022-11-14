import { User } from "firebase/auth";
import { createContext } from "react";
import BuyToClose from "../models/BuyToClose";
import BuyToOpen from "../models/BuyToOpen";
import Dividend from "../models/Dividend";
import SellToClose from "../models/SellToClose";
import SellToOpen from "../models/SellToOpen";
import Stock from "../models/Stock";
import StockPurchase from "../models/StockPurchase";
import StockSale from "../models/StockSale";
import UserProfile from "../models/UserProfile";

export interface AuthContextModel {
  user: User | null; // null when not logged in
  stocks: Stock[];
  addStock: (stock: Stock, uid: string) => void;
  buyShares: (uid: string, ticker: string, purchase: StockPurchase) => void;
  sellShares: (uid: string, ticker: string, sale: StockSale) => void;
  addDividend: (uid: string, ticker: string, dividend: Dividend) => void;
  addBTO: (uid: string, ticker: string, bto: BuyToOpen) => void;
  addSTO: (uid: string, ticker: string, sto: SellToOpen) => void;
  addBTC: (uid: string, ticker: string, bto: BuyToClose, index: number) => void;
  addSTC: (
    uid: string,
    ticker: string,
    sto: SellToClose,
    index: number
  ) => void;
}

const defaultValue: AuthContextModel = {
  user: null,
  stocks: [],
  addStock: () => {},
  buyShares: () => {},
  sellShares: () => {},
  addDividend: () => {},
  addBTO: () => {},
  addSTO: () => {},
  addBTC: () => {},
  addSTC: () => {},
};

const AuthContext = createContext(defaultValue);
export default AuthContext;
