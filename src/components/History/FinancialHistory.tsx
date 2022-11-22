import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import TransactionView from "../../models/TransactionView";
import { formatMoney } from "../../services/formatFunctions";
import "./FinancialHistory.css";
import FinancialHistoryTable from "./FinancialHistoryTable";

const FinancialHistory = () => {
  const { stocks } = useContext(AuthContext);
  const ticker: string | undefined = useParams().ticker;
  const [transactions, setTransactions] = useState<TransactionView[]>([]);
  const [topItem, setTopItem] = useState<number>(0);
  const [search, setSearch] = useState(ticker || "");

  const handlePrevClick = (): void => setTopItem(topItem - 10);

  const handleNextClick = (): void => setTopItem(topItem + 10);

  useEffect(() => {
    stocks.forEach((stock) => {
      stock.stockPurchases.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: stock.ticker,
          transactionName: "Stock Purchase",
          transactionType: "buySell",
          transactionDescription: `Purchased ${item.quantity} Shares`,
          transactionDate: item.date,
          transactionAmount: `-${formatMoney(item.cost)}`,
        };
        setTransactions((prev) => [...prev, transactionObject]);
      });
      stock.stockSales.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: stock.ticker,
          transactionName: "Stock Sale",
          transactionType: "buySell",
          transactionDescription: `Sold ${item.quantity} Shares`,
          transactionDate: item.date,
          transactionAmount: formatMoney(item.cost),
        };
        setTransactions((prev) => [...prev, transactionObject]);
      });
      stock.buyToOpenOptions.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: stock.ticker,
          transactionName: "Buy To Open",
          transactionType: "option",
          transactionDescription: `${item.expirationDate} ${formatMoney(
            item.strike
          )} ${item.callPut}`,
          transactionDate: item.transactionDate,
          transactionAmount: `-${formatMoney(item.premium)}`,
        };
        setTransactions((prev) => [...prev, transactionObject]);
      });
      stock.sellToOpenOptions.forEach((item) => {
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
        setTransactions((prev) => [...prev, transactionObject]);
      });
      stock.buyToCloseOptions.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: stock.ticker,
          transactionName: "Buy To Close",
          transactionType: "option",
          transactionDescription: `${item.expirationDate} ${formatMoney(
            item.strike
          )} ${item.callPut}`,
          transactionDate: item.transactionDate,
          transactionAmount: `-${formatMoney(item.premium)}`,
        };
        setTransactions((prev) => [...prev, transactionObject]);
      });
      stock.sellToCloseOptions.forEach((item) => {
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
        setTransactions((prev) => [...prev, transactionObject]);
      });
      stock.dividends.forEach((item) => {
        const transactionObject: TransactionView = {
          ticker: stock.ticker,
          transactionName: "Dividend",
          transactionType: "dividend",
          transactionDate: item.date,
          transactionAmount: formatMoney(item.amount),
        };
        setTransactions((prev) => [...prev, transactionObject]);
      });
    });
  }, [stocks]);

  return (
    <main className="FinancialHistory">
      <h2>Transactions History</h2>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value.toUpperCase())}
      />
      <FinancialHistoryTable
        search={search}
        topItem={topItem}
        transactions={transactions}
      />
      <button onClick={handlePrevClick} disabled={topItem === 0}>
        Prev
      </button>
      <button
        onClick={handleNextClick}
        disabled={topItem + 20 > transactions.length}
      >
        Next
      </button>
    </main>
  );
};

export default FinancialHistory;
