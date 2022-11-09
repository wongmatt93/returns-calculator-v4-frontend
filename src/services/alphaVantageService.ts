import axios from "axios";
import AlphaVantageResponse from "../models/AlphaVantageResponse";
import AVAutofillResponse from "../models/AVAutofillResponse";

const key: string = process.env.REACT_APP_ALPHA_ADVANTAGE_API_KEY || "";

export const getStockInfo = async (
  ticker: string
): Promise<AlphaVantageResponse> =>
  (
    await axios.get("https://www.alphavantage.co/query", {
      params: { function: "OVERVIEW", symbol: ticker, apikey: key },
    })
  ).data;

export const getStockSearchAutofill = async (
  keyword: string
): Promise<AVAutofillResponse> =>
  (
    await axios.get("https://www.alphavantage.co/query", {
      params: { function: "SYMBOL_SEARCH", keywords: keyword, apikey: key },
    })
  ).data;
