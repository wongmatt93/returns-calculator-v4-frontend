import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Stock from "../../models/Stock";
import { getStockInfo } from "../../services/alphaVantageService";
import { formatMoney } from "../../services/formatFunctions";
import {
  getOpenOptions,
  getStockQuantity,
  getTotalCredits,
  getTotalDebits,
} from "../../services/stockFunctions";
import AddDividendForm from "./Forms/AddDividendForm";
import AddOpenOptionsForm from "./Forms/AddOpenOptionsForm";
import BuySharesForm from "./Forms/BuySharesForm";
import OpenOptionsTable from "./Tables/OpenOptionsTable";
import SellSharesForm from "./Forms/SellSharesForm";
import "./StockDetails.css";
import TransactionView from "../../models/TransactionView";
import AlphaVantageResponse from "../../models/AlphaVantage";

const StockDetails = () => {
  const { stocks } = useContext(AuthContext);
  const ticker: string | undefined = useParams().ticker;
  const [stock, setStock] = useState<Stock | undefined>(undefined);
  const [stockInfo, setStockInfo] = useState<AlphaVantageResponse | null>(null);
  const [creditTransactions, setCreditTransactions] = useState<
    TransactionView[]
  >([]);
  const [debitTransactions, setDebitTransactions] = useState<TransactionView[]>(
    []
  );

  useEffect(() => {
    if (ticker) {
      setStock(stocks.find((stock) => stock.ticker === ticker));
      getStockInfo(ticker).then((response) => setStockInfo(response));
    }
  }, [ticker, stocks]);

  useEffect(() => {
    stock?.dividends.forEach((item) => {
      const transactionObject: TransactionView = {
        ticker: stock.ticker,
        transactionName: "Dividend",
        transactionType: "dividend",
        transactionDescription: "Dividend",
        transactionDate: item.date,
        transactionAmount: formatMoney(item.amount),
      };
      setCreditTransactions((prev) => [...prev, transactionObject]);
    });
    stock?.sellToOpenOptions.forEach((item) => {
      const transactionObject: TransactionView = {
        ticker: stock.ticker,
        transactionName: "Sell To Open",
        transactionType: "option",
        transactionDescription: `${item.expirationDate} ${formatMoney(
          item.strike
        )} ${item.callPut}`,
        transactionDate: item.transactionDate,
        transactionAmount: formatMoney(item.premium),
      };
      setCreditTransactions((prev) => [...prev, transactionObject]);
    });
    stock?.sellToCloseOptions.forEach((item) => {
      const transactionObject: TransactionView = {
        ticker: stock.ticker,
        transactionName: "Sell To Close",
        transactionType: "option",
        transactionDescription: `${item.expirationDate} ${formatMoney(
          item.strike
        )} ${item.callPut}`,
        transactionDate: item.transactionDate,
        transactionAmount: formatMoney(item.premium),
      };
      setCreditTransactions((prev) => [...prev, transactionObject]);
    });
    stock?.stockSales.forEach((item) => {
      const transactionObject: TransactionView = {
        ticker: stock.ticker,
        transactionName: "Stock Sale",
        transactionType: "option",
        transactionDescription: `Sold ${item.quantity} Shares`,
        transactionDate: item.date,
        transactionAmount: formatMoney(item.cost),
      };
      setCreditTransactions((prev) => [...prev, transactionObject]);
    });
    stock?.buyToOpenOptions.forEach((item) => {
      const transactionObject: TransactionView = {
        ticker: stock.ticker,
        transactionName: "Buy To Open",
        transactionType: "option",
        transactionDescription: `${item.expirationDate} ${formatMoney(
          item.strike
        )} ${item.callPut}`,
        transactionDate: item.transactionDate,
        transactionAmount: formatMoney(item.premium),
      };
      setDebitTransactions((prev) => [...prev, transactionObject]);
    });
    stock?.buyToCloseOptions.forEach((item) => {
      const transactionObject: TransactionView = {
        ticker: stock.ticker,
        transactionName: "Buy To Close",
        transactionType: "option",
        transactionDescription: `${item.expirationDate} ${formatMoney(
          item.strike
        )} ${item.callPut}`,
        transactionDate: item.transactionDate,
        transactionAmount: formatMoney(item.premium),
      };
      setDebitTransactions((prev) => [...prev, transactionObject]);
    });
    stock?.stockPurchases.forEach((item) => {
      const transactionObject: TransactionView = {
        ticker: stock.ticker,
        transactionName: "Buy To Close",
        transactionType: "option",
        transactionDescription: `Sold ${item.quantity} Shares`,
        transactionDate: item.date,
        transactionAmount: formatMoney(item.cost),
      };
      setDebitTransactions((prev) => [...prev, transactionObject]);
    });
  }, [stock]);

  return (
    <main className="StockDetails">
      {stock && stockInfo && (
        <>
          <h2>
            {ticker}: {stockInfo.Name}
          </h2>
          <div className="stock-details-body">
            <div className="current-stock-info">
              {/* <Link to={`/history/${ticker}`}>Show History</Link> */}
              <div className="button-container">
                <BuySharesForm ticker={ticker!} />
                <SellSharesForm stock={stock} />
                <AddOpenOptionsForm stock={stock} />
                <AddDividendForm stock={stock} />
              </div>
              <table className="individual-stock-table">
                <caption>Current Stock Position</caption>
                <thead>
                  <tr>
                    <th>Total Credits</th>
                    <th>Total Debits</th>
                    <th>Profit</th>
                    <th>Break Even</th>
                    <th># of Shares</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{formatMoney(getTotalCredits(stock))}</td>
                    <td>{formatMoney(getTotalDebits(stock))}</td>
                    <td>
                      {formatMoney(
                        getTotalCredits(stock) - getTotalDebits(stock)
                      )}
                    </td>
                    <td>
                      {getStockQuantity(stock)
                        ? formatMoney(
                            ((getTotalCredits(stock) - getTotalDebits(stock)) /
                              getStockQuantity(stock)) *
                              -1
                          )
                        : "N/A"}
                    </td>
                    <td>{getStockQuantity(stock)}</td>
                  </tr>
                </tbody>
              </table>
              <OpenOptionsTable
                openBTO={getOpenOptions(stock.buyToOpenOptions)}
                openSTO={getOpenOptions(stock.sellToOpenOptions)}
              />
            </div>
            <div className="stock-details-history-tables">
              <table>
                <caption>Credits</caption>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Transaction</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {creditTransactions
                    .sort(
                      (a, b) =>
                        new Date(b.transactionDate).valueOf() -
                        new Date(a.transactionDate).valueOf()
                    )
                    .map((item) => (
                      <tr>
                        <td>{item.transactionDate}</td>
                        <td>{item.transactionDescription}</td>
                        <td>{item.transactionAmount}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <table>
                <caption>Debits</caption>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Transaction</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {debitTransactions
                    .sort(
                      (a, b) =>
                        new Date(b.transactionDate).valueOf() -
                        new Date(a.transactionDate).valueOf()
                    )
                    .map((item) => (
                      <tr>
                        <td>{item.transactionDate}</td>
                        <td>{item.transactionDescription}</td>
                        <td>{item.transactionAmount}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default StockDetails;
