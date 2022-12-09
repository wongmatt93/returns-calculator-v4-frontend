import { User } from "firebase/auth";
import { createContext } from "react";
import Stock, {
  BuyToClose,
  BuyToOpen,
  Dividend,
  SellToClose,
  SellToOpen,
  StockPurchase,
  StockSale,
} from "../models/Stock";

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
