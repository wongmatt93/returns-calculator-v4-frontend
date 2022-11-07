import axios from "axios";
import AlphaVantageResponse from "../models/AlphaVantageResponse";

const key: string = process.env.REACT_APP_ALPHA_ADVANTAGE_API_KEY || "";

const getStockInfo = (ticker: string): Promise<AlphaVantageResponse> =>
  axios
    .get("https://www.alphavantage.co/query", {
      params: { function: "OVERVIEW", symbol: ticker, apikey: key },
    })
    .then((response) => response.data);

export { getStockInfo };
