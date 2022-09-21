import axios from "axios";
import Dividend from "../models/Dividend";
import Stock from "../models/Stock";
import StockPurchase from "../models/StockPurchase";
import StockSale from "../models/StockSale";
import UserProfile from "../models/UserProfile";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getAllProfiles = async (): Promise<UserProfile[]> =>
  (await axios.get(`${baseURL}/user_profiles`)).data;

export const getProfileByUid = async (uid: string): Promise<UserProfile> =>
  (await axios.get(`${baseURL}/user_profiles/${uid}`)).data;

export const addNewProfile = async (
  profile: UserProfile
): Promise<UserProfile> =>
  (await axios.post(`${baseURL}/user_profiles`, profile)).data;

export const addNewStock = async (stock: Stock, uid: string): Promise<Stock> =>
  (await axios.put(`${baseURL}/user_profiles/stocks/${uid}`, stock)).data;

export const buyShares = async (
  uid: string,
  ticker: string,
  purchase: StockPurchase
): Promise<StockPurchase> =>
  (
    await axios.put(
      `${baseURL}/user_profiles/stocks/purchase/${uid}/${ticker}`,
      purchase
    )
  ).data;

export const sellShares = async (
  uid: string,
  ticker: string,
  sale: StockSale
): Promise<StockPurchase> =>
  (
    await axios.put(
      `${baseURL}/user_profiles/stocks/sale/${uid}/${ticker}`,
      sale
    )
  ).data;

export const addDividend = async (
  uid: string,
  ticker: string,
  dividend: Dividend
): Promise<StockPurchase> =>
  (
    await axios.put(
      `${baseURL}/user_profiles/stocks/dividend/${uid}/${ticker}`,
      dividend
    )
  ).data;
