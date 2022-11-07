import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import TransactionView from "../models/TransactionView";
import "./FinancialHistory.css";
import FinancialHistoryItem from "./FinancialHistoryItem";

const FinancialHistory = () => {
  const { stocks } = useContext(AuthContext);
  const [transactions, setTransactions] = useState<TransactionView[]>([]);
  const [topItem, setTopItem] = useState<number>(0);

  const handlePrevClick = (): void => setTopItem(topItem - 10);

  const handleNextClick = (): void => setTopItem(topItem + 10);

  useEffect(() => {
    stocks.forEach((stock) => {
      stock.stockPurchases.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: stock.ticker,
          transactionName: "Stock Purchase",
          transactionType: "buySell",
          stockQuantity: item.quantity,
          transactionDate: item.date,
          transactionAmount: item.cost,
        };
        setTransactions((prev) => [...prev, transactionObject]);
      });
      stock.stockSales.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: stock.ticker,
          transactionName: "Stock Sale",
          transactionType: "buySell",
          stockQuantity: item.quantity,
          transactionDate: item.date,
          transactionAmount: item.cost,
        };
        setTransactions((prev) => [...prev, transactionObject]);
      });
      stock.buyToOpenOptions.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: stock.ticker,
          transactionName: "Buy To Open",
          transactionType: "option",
          optionDescription: `${item.expirationDate} ${item.strike} ${item.callPut}`,
          transactionDate: item.transactionDate,
          transactionAmount: item.premium,
        };
        setTransactions((prev) => [...prev, transactionObject]);
      });
      stock.buyToCloseOptions.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: stock.ticker,
          transactionName: "Buy To Close",
          transactionType: "option",
          optionDescription: `${item.expirationDate} ${item.strike} ${item.callPut}`,
          transactionDate: item.transactionDate,
          transactionAmount: item.premium,
        };
        setTransactions((prev) => [...prev, transactionObject]);
      });
      stock.sellToOpenOptions.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: stock.ticker,
          transactionName: "Sell To Open",
          transactionType: "option",
          optionDescription: `${item.expirationDate} ${item.strike} ${item.callPut}`,
          transactionDate: item.transactionDate,
          transactionAmount: item.premium,
        };
        setTransactions((prev) => [...prev, transactionObject]);
      });
      stock.sellToCloseOptions.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: stock.ticker,
          transactionName: "Sell To Close",
          transactionType: "option",
          optionDescription: `${item.expirationDate} ${item.strike} ${item.callPut}`,
          transactionDate: item.transactionDate,
          transactionAmount: item.premium,
        };
        setTransactions((prev) => [...prev, transactionObject]);
      });
      stock.dividends.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: stock.ticker,
          transactionName: "Dividend",
          transactionType: "dividend",
          transactionDate: item.date,
          transactionAmount: item.amount,
        };
        setTransactions((prev) => [...prev, transactionObject]);
      });
    });
  }, [stocks]);

  return (
    <div className="FinancialHistory">
      <h2>Transactions History</h2>
      <ul>
        {transactions
          .sort(
            (a, b) =>
              new Date(b.transactionDate).valueOf() -
              new Date(a.transactionDate).valueOf()
          )
          .slice(topItem, topItem + 10)
          .map((transaction, index) => (
            <FinancialHistoryItem key={index} transaction={transaction} />
          ))}
      </ul>
      <button onClick={handlePrevClick} disabled={topItem === 0}>
        Prev
      </button>
      <button
        onClick={handleNextClick}
        disabled={topItem + 10 > transactions.length}
      >
        Next
      </button>
    </div>
  );
};

export default FinancialHistory;
