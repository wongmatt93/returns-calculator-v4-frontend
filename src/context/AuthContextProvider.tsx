import { ReactNode, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import UserProfile from "../models/UserProfile";
import {
  addNewBTC,
  addNewBTO,
  addNewDividend,
  addNewProfile,
  addNewSTC,
  addNewSTO,
  addNewStock,
  buyNewShares,
  getAllProfiles,
  sellNewShares,
} from "../services/userProfileService";
import { User } from "firebase/auth";
import Stock from "../models/Stock";
import StockPurchase from "../models/StockPurchase";
import StockSale from "../models/StockSale";
import Dividend from "../models/Dividend";
import BuyToOpen from "../models/BuyToOpen";
import SellToOpen from "../models/SellToOpen";
import BuyToClose from "../models/BuyToClose";
import SellToClose from "../models/SellToClose";

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

  const getAndSetProfiles = () => {
    getAllProfiles().then((response) => setProfiles(response));
  };

  const addStock = (stock: Stock, uid: string): Promise<void> =>
    addNewStock(stock, uid).then(() => getAndSetProfiles());

  const buyShares = (
    uid: string,
    ticker: string,
    purchase: StockPurchase
  ): Promise<void> =>
    buyNewShares(uid, ticker, purchase).then(() => getAndSetProfiles());

  const sellShares = (
    uid: string,
    ticker: string,
    sale: StockSale
  ): Promise<void> =>
    sellNewShares(uid, ticker, sale).then(() => getAndSetProfiles());

  const addDividend = (
    uid: string,
    ticker: string,
    dividend: Dividend
  ): Promise<void> =>
    addNewDividend(uid, ticker, dividend).then(() => getAndSetProfiles());

  const addBTO = (uid: string, ticker: string, bto: BuyToOpen): Promise<void> =>
    addNewBTO(uid, ticker, bto).then(() => getAndSetProfiles());

  const addSTO = (
    uid: string,
    ticker: string,
    sto: SellToOpen
  ): Promise<void> =>
    addNewSTO(uid, ticker, sto).then(() => getAndSetProfiles());

  const addBTC = (
    uid: string,
    ticker: string,
    btc: BuyToClose,
    index: number
  ): Promise<void> =>
    addNewBTC(uid, ticker, btc, index).then(() => getAndSetProfiles());

  const addSTC = (
    uid: string,
    ticker: string,
    stc: SellToClose,
    index: number
  ): Promise<void> =>
    addNewSTC(uid, ticker, stc, index).then(() => getAndSetProfiles());

  useEffect(() => {
    // useEffect to only register once at start
    return auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
      getAndSetProfiles();
    });
  }, []);

  useEffect(() => {
    if (user && profiles) {
      const found: UserProfile | undefined = profiles.find(
        (profile) => profile.uid === user.uid
      );
      if (found) {
        setCurrentUserProfile(found);
        setStocks(found.stocks);
      } else {
        const newUser: UserProfile = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          uid: user.uid,
          stocks: [],
        };
        addNewProfile(newUser).then(() => setCurrentUserProfile(newUser));
        setStocks(newUser.stocks);
      }
    }
  }, [profiles]);

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUserProfile,
        stocks,
        addStock,
        buyShares,
        sellShares,
        addDividend,
        addBTO,
        addSTO,
        addBTC,
        addSTC,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
