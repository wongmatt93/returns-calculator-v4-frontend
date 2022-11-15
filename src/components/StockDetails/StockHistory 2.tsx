import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Stock from "../../models/Stock";
import TransactionView from "../../models/TransactionView";
import "./StockHistory.css";
import StockHistoryItem from "./StockHistoryItem";

const StockHistory = () => {
  const { stocks } = useContext(AuthContext);
  const ticker: string | undefined = useParams().ticker;
  const [checkBuySell, setCheckBuySell] = useState(true);
  const [checkOption, setCheckOption] = useState(true);
  const [checkDividend, setCheckDividend] = useState(true);
  const [transactions, setTransactions] = useState<TransactionView[]>([]);

  useEffect(() => {
    const stock: Stock | undefined = stocks.find(
      (stock) => stock.ticker === ticker
    );

    stock!.stockPurchases.forEach((item) => {
      const transactionObject: TransactionView = {
        ticker: ticker!,
        transactionName: "Stock Purchase",
        transactionType: "buySell",
        stockQuantity: item.quantity,
        transactionDate: item.date,
        transactionAmount: item.cost,
      };
      setTransactions((prev) => [...prev, transactionObject]);
    });
    stock!.stockSales.forEach((item) => {
      const transactionObject: TransactionView = {
        ticker: ticker!,
        transactionName: "Stock Sale",
        transactionType: "buySell",
        stockQuantity: item.quantity,
        transactionDate: item.date,
        transactionAmount: item.cost,
      };
      setTransactions((prev) => [...prev, transactionObject]);
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
      setTransactions((prev) => [...prev, transactionObject]);
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
      setTransactions((prev) => [...prev, transactionObject]);
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
      setTransactions((prev) => [...prev, transactionObject]);
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
      setTransactions((prev) => [...prev, transactionObject]);
    });
    stock!.dividends.forEach((item) => {
      const transactionObject: TransactionView = {
        ticker: ticker!,
        transactionName: "Dividend",
        transactionType: "dividend",
        transactionDate: item.date,
        transactionAmount: item.amount,
      };
      setTransactions((prev) => [...prev, transactionObject]);
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
        {transactions
          .sort(
            (a, b) =>
              new Date(b.transactionDate).valueOf() -
              new Date(a.transactionDate).valueOf()
          )
          .map((transaction, index) => (
            <StockHistoryItem
              key={index}
              transaction={transaction}
              buySell={checkBuySell}
              option={checkOption}
              dividend={checkDividend}
            />
          ))}
      </ul>
    </main>
  );
};

export default StockHistory;
