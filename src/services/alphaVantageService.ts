import axios from "axios";
import AlphaVantageResponse from "../models/AlphaVantageResponse";
import AVNewsResponse from "../models/AVNewsResponse";

const key: string = process.env.REACT_APP_ALPHA_ADVANTAGE_API_KEY || "";

export const getStockInfo = async (
  ticker: string
): Promise<AlphaVantageResponse> =>
  (
    await axios.get("https://www.alphavantage.co/query", {
      params: { function: "OVERVIEW", symbol: ticker, apikey: key },
    })
  ).data;

export const getStockNews = async (ticker: string): Promise<AVNewsResponse> =>
  (
    await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: "NEWS_SENTIMENT",
        tickers: ticker,
        apikey: key,
      },
    })
  ).data;
