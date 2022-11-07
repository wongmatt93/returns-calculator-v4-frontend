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
  const [currentUserProfile, setCurrentUserProfile] = useState<
    UserProfile | undefined
  >(undefined);
  const [stocks, setStocks] = useState<Stock[]>([]);

  const getAndSetStocks = () => {
    getAllProfiles().then((response) => {
      const profile: UserProfile | undefined = response.find(
        (profile) => profile.uid === user!.uid
      );
      setStocks(profile!.stocks);
    });
  };

  const addStock = (stock: Stock, uid: string): Promise<void> =>
    addNewStock(stock, uid).then(() => getAndSetStocks());

  const buyShares = (
    uid: string,
    ticker: string,
    purchase: StockPurchase
  ): Promise<void> =>
    buyNewShares(uid, ticker, purchase).then(() => getAndSetStocks());

  const sellShares = (
    uid: string,
    ticker: string,
    sale: StockSale
  ): Promise<void> =>
    sellNewShares(uid, ticker, sale).then(() => getAndSetStocks());

  const addDividend = (
    uid: string,
    ticker: string,
    dividend: Dividend
  ): Promise<void> =>
    addNewDividend(uid, ticker, dividend).then(() => getAndSetStocks());

  const addBTO = (uid: string, ticker: string, bto: BuyToOpen): Promise<void> =>
    addNewBTO(uid, ticker, bto).then(() => getAndSetStocks());

  const addSTO = (
    uid: string,
    ticker: string,
    sto: SellToOpen
  ): Promise<void> => addNewSTO(uid, ticker, sto).then(() => getAndSetStocks());

  const addBTC = (
    uid: string,
    ticker: string,
    btc: BuyToClose,
    index: number
  ): Promise<void> =>
    addNewBTC(uid, ticker, btc, index).then(() => getAndSetStocks());

  const addSTC = (
    uid: string,
    ticker: string,
    stc: SellToClose,
    index: number
  ): Promise<void> =>
    addNewSTC(uid, ticker, stc, index).then(() => getAndSetStocks());

  useEffect(() => {
    // useEffect to only register once at start
    return auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
      getAllProfiles().then((response) => {
        const found: UserProfile | undefined = response.find(
          (profile) => profile.uid === newUser!.uid
        );
        if (found) {
          setCurrentUserProfile(found);
          setStocks(found.stocks);
        } else {
          const newUserProfile: UserProfile = {
            name: newUser!.displayName,
            email: newUser!.email,
            photo: newUser!.photoURL,
            uid: newUser!.uid,
            stocks: [],
          };
          addNewProfile(newUserProfile).then(() =>
            setCurrentUserProfile(newUserProfile)
          );
          setStocks(newUserProfile.stocks);
        }
      });
    });
  }, []);

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
