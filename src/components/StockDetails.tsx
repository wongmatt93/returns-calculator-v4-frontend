import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import AlphaAdvantageResponse from "../models/AlphaAdvantageResponse";
import Stock from "../models/Stock";
import { getStockInfo } from "../services/alphaAdvantageService";
import { formatMoney, formatPercent } from "../services/formatFunctions";
import {
  getCashReturns,
  getCostBasis,
  getOpenOptions,
  getOpenOptionsCostBasis,
  getOptionsTotalPremium,
  getStockQuantity,
} from "../services/stockFunctions";
import AddDividendForm from "./AddDividendForm";
import AddOpenOptionsForm from "./AddOpenOptionsForm";
import BuySharesForm from "./BuySharesForm";
import DividendTable from "./DividendTable";
import OpenOptionsTable from "./OpenOptionsTable";
import SellSharesForm from "./SellSharesForm";
import "./StockDetails.css";

const StockDetails = () => {
  const { stocks } = useContext(AuthContext);
  const ticker: string | undefined = useParams().ticker;
  const [stock, setStock] = useState<Stock | undefined>(undefined);
  const [stockInfo, setStockInfo] = useState<AlphaAdvantageResponse | null>(
    null
  );

  useEffect(() => {
    if (ticker) {
      setStock(stocks.find((stock) => stock.ticker === ticker));
      getStockInfo(ticker).then((response) => setStockInfo(response));
    }
  }, [ticker, stocks]);

  return (
    <main className="StockDetails">
      {stock && stockInfo && (
        <>
          <h2>
            {ticker}: {stockInfo.Name}
          </h2>
          <div className="button-container">
            <BuySharesForm ticker={ticker!} />
            <SellSharesForm stock={stock} />
            <AddOpenOptionsForm stock={stock} />
            <AddDividendForm stock={stock} />
          </div>
          <table className="individual-stock-table">
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Cost Basis</th>
                <th>Cash Return</th>
                <th>Return %</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{getStockQuantity(stock)}</td>
                <td>
                  {formatMoney(
                    getCostBasis(stock) + getOpenOptionsCostBasis(stock)
                  )}
                </td>
                <td>
                  {formatMoney(
                    getCashReturns(stock) + getOptionsTotalPremium(stock)
                  )}
                </td>
                <td>
                  {getCostBasis(stock) + getOpenOptionsCostBasis(stock)
                    ? formatPercent(
                        getCashReturns(stock) + getOptionsTotalPremium(stock),
                        getCostBasis(stock) + getOpenOptionsCostBasis(stock)
                      )
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
          <OpenOptionsTable
            openBTO={getOpenOptions(stock.buyToOpenOptions)}
            openSTO={getOpenOptions(stock.sellToOpenOptions)}
          />
          <DividendTable dividends={stock.dividends} />
        </>
      )}
    </main>
  );
};

export default StockDetails;
