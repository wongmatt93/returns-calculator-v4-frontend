import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Stock from "../models/Stock";
import TransactionView from "../models/TransactionView";
import "./StockHistory.css";
import StockYearlyHistory from "./StockYearlyHistory";

const StockHistory = () => {
  const { stocks } = useContext(AuthContext);
  const ticker: string | undefined = useParams().ticker;
  const [checkBuySell, setCheckBuySell] = useState(true);
  const [checkOption, setCheckOption] = useState(true);
  const [checkDividend, setCheckDividend] = useState(true);
  const [yearlyReport, setYearlyReport] = useState<{
    [key: string]: TransactionView[];
  }>({});

  const getYear = (date = new Date()): string => date.getFullYear().toString();

  useEffect(() => {
    const stock: Stock | undefined = stocks.find(
      (stock) => stock.ticker === ticker
    );
    setYearlyReport(() => {
      const newObject: { [key: string]: any } = {};
      stock!.stockPurchases.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: ticker!,
          transactionName: "Stock Purchase",
          transactionType: "buySell",
          transactionDate: item.date,
          transactionAmount: item.cost,
        };
        if (!newObject[getYear(new Date(item.date))]) {
          newObject[getYear(new Date(item.date))] = [];
          newObject[getYear(new Date(item.date))].push(transactionObject);
        } else {
          newObject[getYear(new Date(item.date))].push(transactionObject);
        }
      });
      stock!.stockSales.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: ticker!,
          transactionName: "Stock Sale",
          transactionType: "buySell",
          transactionDate: item.date,
          transactionAmount: item.cost,
        };
        if (!newObject[getYear(new Date(item.date))]) {
          newObject[getYear(new Date(item.date))] = [];
          newObject[getYear(new Date(item.date))].push(transactionObject);
        } else {
          newObject[getYear(new Date(item.date))].push(transactionObject);
        }
      });
      stock!.buyToOpenOptions.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: ticker!,
          transactionName: "Buy To Open",
          transactionType: "option",
          optionDescription: `${item.expirationDate} ${item.strike} ${item.callPut}`,
          transactionDate: item.transactionDate,
          transactionAmount: item.premium,
        };
        if (!newObject[getYear(new Date(item.transactionDate))]) {
          newObject[getYear(new Date(item.transactionDate))] = [];
          newObject[getYear(new Date(item.transactionDate))].push(
            transactionObject
          );
        } else {
          newObject[getYear(new Date(item.transactionDate))].push(
            transactionObject
          );
        }
      });
      stock!.buyToCloseOptions.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: ticker!,
          transactionName: "Buy To Close",
          transactionType: "option",
          optionDescription: `${item.expirationDate} ${item.strike} ${item.callPut}`,
          transactionDate: item.transactionDate,
          transactionAmount: item.premium,
        };
        if (!newObject[getYear(new Date(item.transactionDate))]) {
          newObject[getYear(new Date(item.transactionDate))] = [];
          newObject[getYear(new Date(item.transactionDate))].push(
            transactionObject
          );
        } else {
          newObject[getYear(new Date(item.transactionDate))].push(
            transactionObject
          );
        }
      });
      stock!.sellToOpenOptions.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: ticker!,
          transactionName: "Sell To Open",
          transactionType: "option",
          optionDescription: `${item.expirationDate} ${item.strike} ${item.callPut}`,
          transactionDate: item.transactionDate,
          transactionAmount: item.premium,
        };
        if (!newObject[getYear(new Date(item.transactionDate))]) {
          newObject[getYear(new Date(item.transactionDate))] = [];
          newObject[getYear(new Date(item.transactionDate))].push(
            transactionObject
          );
        } else {
          newObject[getYear(new Date(item.transactionDate))].push(
            transactionObject
          );
        }
      });
      stock!.sellToCloseOptions.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: ticker!,
          transactionName: "Sell To Close",
          transactionType: "option",
          optionDescription: `${item.expirationDate} ${item.strike} ${item.callPut}`,
          transactionDate: item.transactionDate,
          transactionAmount: item.premium,
        };
        if (!newObject[getYear(new Date(item.transactionDate))]) {
          newObject[getYear(new Date(item.transactionDate))] = [];
          newObject[getYear(new Date(item.transactionDate))].push(
            transactionObject
          );
        } else {
          newObject[getYear(new Date(item.transactionDate))].push(
            transactionObject
          );
        }
      });
      stock!.dividends.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: ticker!,
          transactionName: "Dividend",
          transactionType: "dividend",
          transactionDate: item.date,
          transactionAmount: item.amount,
        };
        if (!newObject[getYear(new Date(item.date))]) {
          newObject[getYear(new Date(item.date))] = [];
          newObject[getYear(new Date(item.date))].push(transactionObject);
        } else {
          newObject[getYear(new Date(item.date))].push(transactionObject);
        }
      });
      return newObject;
    });
  }, [stocks, ticker]);

  return (
    <main className="StockHistory">
      <h2>{ticker} Transaction History</h2>
      <form>
        <input
          type="checkbox"
          name="buySell"
          id="buySell"
          checked={checkBuySell}
          onChange={(e) => setCheckBuySell(e.target.checked)}
        />
        <label htmlFor="buySell">Purchase/Sale</label>
        <input
          type="checkbox"
          name="option"
          id="option"
          checked={checkOption}
          onChange={(e) => setCheckOption(e.target.checked)}
        />
        <label htmlFor="option">Options</label>
        <input
          type="checkbox"
          name="dividend"
          id="dividend"
          checked={checkDividend}
          onChange={(e) => setCheckDividend(e.target.checked)}
        />
        <label htmlFor="dividend">Dividends</label>
      </form>
      <ul>
        {Object.keys(yearlyReport).map((item, index) => (
          <StockYearlyHistory
            key={index}
            year={item}
            buySell={checkBuySell}
            option={checkOption}
            dividend={checkDividend}
            transactions={yearlyReport[item].sort(
              (a, b) =>
                new Date(a.transactionDate).valueOf() -
                new Date(b.transactionDate).valueOf()
            )}
          />
        ))}
      </ul>
    </main>
  );
};

export default StockHistory;
