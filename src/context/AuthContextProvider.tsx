import { ReactNode, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import {
  addNewBTC,
  addNewBTO,
  addNewDividend,
  addNewProfile,
  addNewSTC,
  addNewSTO,
  addNewStock,
  buyNewShares,
  getProfileByUid,
  sellNewShares,
} from "../services/userProfileService";
import { User } from "firebase/auth";
import Stock, {
  BuyToClose,
  BuyToOpen,
  Dividend,
  SellToClose,
  SellToOpen,
  StockPurchase,
  StockSale,
} from "../models/Stock";
import UserProfile from "../models/UserProfile";

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [stocks, setStocks] = useState<Stock[]>([]);

  const getAndSetStocks = (uid: string) => {
    getProfileByUid(uid).then((response) => setStocks(response!.stocks));
  };

  const addStock = (stock: Stock, uid: string): Promise<void> =>
    addNewStock(stock, uid).then(() => getAndSetStocks(uid));

  const buyShares = (
    uid: string,
    ticker: string,
    purchase: StockPurchase
  ): Promise<void> =>
    buyNewShares(uid, ticker, purchase).then(() => getAndSetStocks(uid));

  const sellShares = (
    uid: string,
    ticker: string,
    sale: StockSale
  ): Promise<void> =>
    sellNewShares(uid, ticker, sale).then(() => getAndSetStocks(uid));

  const addDividend = (
    uid: string,
    ticker: string,
    dividend: Dividend
  ): Promise<void> =>
    addNewDividend(uid, ticker, dividend).then(() => getAndSetStocks(uid));

  const addBTO = (uid: string, ticker: string, bto: BuyToOpen): Promise<void> =>
    addNewBTO(uid, ticker, bto).then(() => getAndSetStocks(uid));

  const addSTO = (
    uid: string,
    ticker: string,
    sto: SellToOpen
  ): Promise<void> =>
    addNewSTO(uid, ticker, sto).then(() => getAndSetStocks(uid));

  const addBTC = (
    uid: string,
    ticker: string,
    btc: BuyToClose,
    index: number
  ): Promise<void> =>
    addNewBTC(uid, ticker, btc, index).then(() => getAndSetStocks(uid));

  const addSTC = (
    uid: string,
    ticker: string,
    stc: SellToClose,
    index: number
  ): Promise<void> =>
    addNewSTC(uid, ticker, stc, index).then(() => getAndSetStocks(uid));

  useEffect(() => {
    // useEffect to only register once at start
    return auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
      newUser &&
        getProfileByUid(newUser.uid).then((response) => {
          if (response) {
            setStocks(response.stocks);
          } else {
            const newUserProfile: UserProfile = {
              name: newUser.displayName,
              email: newUser.email,
              photo: newUser.photoURL,
              uid: newUser.uid,
              stocks: [],
            };
            addNewProfile(newUserProfile).then(() =>
              setStocks(newUserProfile.stocks)
            );
          }
        });
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
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
