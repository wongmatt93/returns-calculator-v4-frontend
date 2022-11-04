import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import BuyToClose from "../models/BuyToClose";
import BuyToOpen from "../models/BuyToOpen";
import Dividend from "../models/Dividend";
import SellToClose from "../models/SellToClose";
import SellToOpen from "../models/SellToOpen";
import StockPurchase from "../models/StockPurchase";
import StockSale from "../models/StockSale";
import { formatMoney } from "../services/formatFunctions";
import "./FinancialsPage.css";
import YearlyTotals from "./YearlyTotals";

const FinancialsPage = () => {
  const { stocks } = useContext(AuthContext);
  const [stockPurchases, setStockPurchases] = useState<StockPurchase[]>([]);
  const [stockSales, setStockSales] = useState<StockSale[]>([]);
  const [btoOptions, setBTOOptions] = useState<BuyToOpen[]>([]);
  const [btcOptions, setBTCOptions] = useState<BuyToClose[]>([]);
  const [stoOptions, setSTOOptions] = useState<SellToOpen[]>([]);
  const [stcOptions, setSTCOptions] = useState<SellToClose[]>([]);
  const [dividends, setDividends] = useState<Dividend[]>([]);
  // const [monthlyReport, setMonthlyReport] = useState<{ [key: string]: any }>(
  //   {}
  // );
  const [quarterlyReport, setQuarterlyReport] = useState<{
    [key: string]: any;
  }>({});
  const [yearlyReport, setYearlyReport] = useState<{ [key: string]: any }>({});

  // const monthNames = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  // const getMonth = (date = new Date()): string => {
  //   const month: number = date.getMonth();
  //   const year: string = date.getFullYear().toString();
  //   return `${year} ${month}`;
  // };

  const getQuarter = (date = new Date()): string => {
    const quarter: string = Math.floor(date.getMonth() / 3 + 1).toString();
    const year: string = date.getFullYear().toString();
    return `${year} Q${quarter}`;
  };

  const getYear = (date = new Date()): string => {
    const year: string = date.getFullYear().toString();
    return year;
  };

  useEffect(() => {
    stocks.forEach((stock) => {
      setStockPurchases((prev) => [...prev, ...stock.stockPurchases]);
      setStockSales((prev) => [...prev, ...stock.stockSales]);
      setBTOOptions((prev) => [...prev, ...stock.buyToOpenOptions]);
      setBTCOptions((prev) => [...prev, ...stock.buyToCloseOptions]);
      setSTOOptions((prev) => [...prev, ...stock.sellToOpenOptions]);
      setSTCOptions((prev) => [...prev, ...stock.sellToCloseOptions]);
      setDividends((prev) => [...prev, ...stock.dividends]);
    });
  }, [stocks]);

  useEffect(() => {
    // setMonthlyReport(() => {
    //   const newObject: { [key: string]: any } = {};
    //   stockPurchases.forEach((item) => {
    //     if (!newObject[getMonth(new Date(item.date))]) {
    //       newObject[getMonth(new Date(item.date))] = item.cost;
    //     } else {
    //       newObject[getMonth(new Date(item.date))] -= item.cost;
    //     }
    //   });
    //   stockSales.forEach((item) => {
    //     if (!newObject[getMonth(new Date(item.date))]) {
    //       newObject[getMonth(new Date(item.date))] = item.cost;
    //     } else {
    //       newObject[getMonth(new Date(item.date))] += item.cost;
    //     }
    //   });
    //   btoOptions.forEach((item) =>
    //     !newObject[getMonth(new Date(item.transactionDate))]
    //       ? (newObject[getMonth(new Date(item.transactionDate))] =
    //           item.premium * -1)
    //       : (newObject[getMonth(new Date(item.transactionDate))] -=
    //           item.premium)
    //   );
    //   btcOptions.forEach((item) =>
    //     !newObject[getMonth(new Date(item.transactionDate))]
    //       ? (newObject[getMonth(new Date(item.transactionDate))] =
    //           item.premium * -1)
    //       : (newObject[getMonth(new Date(item.transactionDate))] -=
    //           item.premium)
    //   );
    //   stoOptions.forEach((item) =>
    //     !newObject[getMonth(new Date(item.transactionDate))]
    //       ? (newObject[getMonth(new Date(item.transactionDate))] = item.premium)
    //       : (newObject[getMonth(new Date(item.transactionDate))] +=
    //           item.premium)
    //   );
    //   stcOptions.forEach((item) =>
    //     !newObject[getMonth(new Date(item.transactionDate))]
    //       ? (newObject[getMonth(new Date(item.transactionDate))] = item.premium)
    //       : (newObject[getMonth(new Date(item.transactionDate))] +=
    //           item.premium)
    //   );
    //   dividends.forEach((item) =>
    //     !newObject[getMonth(new Date(item.date))]
    //       ? (newObject[getMonth(new Date(item.date))] = item.amount)
    //       : (newObject[getMonth(new Date(item.date))] += item.amount)
    //   );
    //   return newObject;
    // });

    setQuarterlyReport(() => {
      const newObject: { [key: string]: any } = {};
      // stockPurchases.forEach((item) =>
      //   !newObject[getQuarter(new Date(item.date))]
      //     ? (newObject[getQuarter(new Date(item.date))] = item.cost * -1)
      //     : (newObject[getQuarter(new Date(item.date))] -= item.cost)
      // );
      // stockSales.forEach((item) =>
      //   !newObject[getQuarter(new Date(item.date))]
      //     ? (newObject[getQuarter(new Date(item.date))] = item.cost)
      //     : (newObject[getQuarter(new Date(item.date))] += item.cost)
      // );
      btoOptions.forEach((item) =>
        !newObject[getQuarter(new Date(item.transactionDate))]
          ? (newObject[getQuarter(new Date(item.transactionDate))] =
              item.premium * -1)
          : (newObject[getQuarter(new Date(item.transactionDate))] -=
              item.premium)
      );
      btcOptions.forEach((item) =>
        !newObject[getQuarter(new Date(item.transactionDate))]
          ? (newObject[getQuarter(new Date(item.transactionDate))] =
              item.premium * -1)
          : (newObject[getQuarter(new Date(item.transactionDate))] -=
              item.premium)
      );
      stoOptions.forEach((item) =>
        !newObject[getQuarter(new Date(item.transactionDate))]
          ? (newObject[getQuarter(new Date(item.transactionDate))] =
              item.premium)
          : (newObject[getQuarter(new Date(item.transactionDate))] +=
              item.premium)
      );
      stcOptions.forEach((item) =>
        !newObject[getQuarter(new Date(item.transactionDate))]
          ? (newObject[getQuarter(new Date(item.transactionDate))] =
              item.premium)
          : (newObject[getQuarter(new Date(item.transactionDate))] +=
              item.premium)
      );
      dividends.forEach((item) =>
        !newObject[getQuarter(new Date(item.date))]
          ? (newObject[getQuarter(new Date(item.date))] = item.amount)
          : (newObject[getQuarter(new Date(item.date))] += item.amount)
      );
      return newObject;
    });

    setYearlyReport(() => {
      const newObject: { [key: string]: any } = {};
      // stockPurchases.forEach((item) =>
      //   !newObject[getYear(new Date(item.date))]
      //     ? (newObject[getYear(new Date(item.date))] = item.cost * -1)
      //     : (newObject[getYear(new Date(item.date))] -= item.cost)
      // );
      // stockSales.forEach((item) =>
      //   !newObject[getYear(new Date(item.date))]
      //     ? (newObject[getYear(new Date(item.date))] = item.cost)
      //     : (newObject[getYear(new Date(item.date))] += item.cost)
      // );
      btoOptions.forEach((item) =>
        !newObject[getYear(new Date(item.transactionDate))]
          ? (newObject[getYear(new Date(item.transactionDate))] =
              item.premium * -1)
          : (newObject[getYear(new Date(item.transactionDate))] -= item.premium)
      );
      btcOptions.forEach((item) =>
        !newObject[getYear(new Date(item.transactionDate))]
          ? (newObject[getYear(new Date(item.transactionDate))] =
              item.premium * -1)
          : (newObject[getYear(new Date(item.transactionDate))] -= item.premium)
      );
      stoOptions.forEach((item) =>
        !newObject[getYear(new Date(item.transactionDate))]
          ? (newObject[getYear(new Date(item.transactionDate))] = item.premium)
          : (newObject[getYear(new Date(item.transactionDate))] += item.premium)
      );
      stcOptions.forEach((item) =>
        !newObject[getYear(new Date(item.transactionDate))]
          ? (newObject[getYear(new Date(item.transactionDate))] = item.premium)
          : (newObject[getYear(new Date(item.transactionDate))] += item.premium)
      );
      dividends.forEach((item) =>
        !newObject[getYear(new Date(item.date))]
          ? (newObject[getYear(new Date(item.date))] = item.amount)
          : (newObject[getYear(new Date(item.date))] += item.amount)
      );
      return newObject;
    });
  }, [
    stockPurchases,
    stockSales,
    btoOptions,
    btcOptions,
    stoOptions,
    stcOptions,
    dividends,
  ]);

  return (
    <div className="FinancialsPage">
      <h2>Yearly Totals</h2>
      <ul>
        {Object.keys(yearlyReport)
          .sort()
          .map((item, index) => (
            <YearlyTotals
              key={index}
              year={item}
              quarterlies={quarterlyReport}
              total={formatMoney(yearlyReport[item])}
            />
          ))}
      </ul>
    </div>
  );
};

export default FinancialsPage;
