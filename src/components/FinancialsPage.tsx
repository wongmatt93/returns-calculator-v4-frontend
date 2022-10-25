import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import BuyToClose from "../models/BuyToClose";
import BuyToOpen from "../models/BuyToOpen";
import Dividend from "../models/Dividend";
import SellToClose from "../models/SellToClose";
import SellToOpen from "../models/SellToOpen";
import StockSale from "../models/StockSale";
import { formatMoney } from "../services/formatFunctions";
import "./FinancialsPage.css";
import YearlyTotals from "./YearlyTotals";

const FinancialsPage = () => {
  const { stocks } = useContext(AuthContext);

  const [stockSales, setStockSales] = useState<StockSale[]>([]);
  const [btoOptions, setBTOOptions] = useState<BuyToOpen[]>([]);
  const [btcOptions, setBTCOptions] = useState<BuyToClose[]>([]);
  const [stoOptions, setSTOOptions] = useState<SellToOpen[]>([]);
  const [stcOptions, setSTCOptions] = useState<SellToClose[]>([]);
  const [dividends, setDividends] = useState<Dividend[]>([]);
  const [monthlyReport, setMonthlyReport] = useState<{ [key: string]: any }>(
    {}
  );
  const [quarterlyReport, setQuarterlyReport] = useState<{
    [key: string]: any;
  }>({});
  const [yearlyReport, setYearlyReport] = useState<{ [key: string]: any }>({});

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getMonth = (date = new Date()): string => {
    const month: number = date.getMonth();
    const year: string = date.getFullYear().toString();
    return `${year} ${month}`;
  };

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
      setStockSales((prev) => {
        const newList = prev.slice(0);
        newList.push(...stock.stockSales);
        return newList;
      });
      setBTOOptions((prev) => {
        const newList = prev.slice(0);
        newList.push(...stock.buyToOpenOptions);
        return newList;
      });
      setBTCOptions((prev) => {
        const newList = prev.slice(0);
        newList.push(...stock.buyToCloseOptions);
        return newList;
      });
      setSTOOptions((prev) => {
        const newList = prev.slice(0);
        newList.push(...stock.sellToOpenOptions);
        return newList;
      });
      setSTCOptions((prev) => {
        const newList = prev.slice(0);
        newList.push(...stock.sellToCloseOptions);
        return newList;
      });
      setDividends((prev) => {
        const newList = prev.slice(0);
        newList.push(...stock.dividends);
        return newList;
      });
    });
  }, []);

  useEffect(() => {
    setMonthlyReport(() => {
      const newObject: { [key: string]: any } = {};
      stockSales.forEach((item) => {
        if (!newObject[getMonth(new Date(item.date))]) {
          newObject[getMonth(new Date(item.date))] = item.profit;
        } else {
          newObject[getMonth(new Date(item.date))] += item.profit;
        }
      });
      btoOptions.forEach((item) => {
        if (!newObject[getMonth(new Date(item.transactionDate))]) {
          newObject[getMonth(new Date(item.transactionDate))] =
            item.premium * -1;
        } else {
          newObject[getMonth(new Date(item.transactionDate))] -= item.premium;
        }
      });
      btcOptions.forEach((item) => {
        if (!newObject[getMonth(new Date(item.transactionDate))]) {
          newObject[getMonth(new Date(item.transactionDate))] =
            item.premium * -1;
        } else {
          newObject[getMonth(new Date(item.transactionDate))] -= item.premium;
        }
      });
      stoOptions.forEach((item) => {
        if (!newObject[getMonth(new Date(item.transactionDate))]) {
          newObject[getMonth(new Date(item.transactionDate))] = item.premium;
        } else {
          newObject[getMonth(new Date(item.transactionDate))] += item.premium;
        }
      });
      stcOptions.forEach((item) => {
        if (!newObject[getMonth(new Date(item.transactionDate))]) {
          newObject[getMonth(new Date(item.transactionDate))] = item.premium;
        } else {
          newObject[getMonth(new Date(item.transactionDate))] += item.premium;
        }
      });
      dividends.forEach((item) => {
        if (!newObject[getMonth(new Date(item.date))]) {
          newObject[getMonth(new Date(item.date))] = item.amount;
        } else {
          newObject[getMonth(new Date(item.date))] += item.amount;
        }
      });
      return newObject;
    });
    setQuarterlyReport(() => {
      const newObject: { [key: string]: any } = {};
      stockSales.forEach((item) => {
        if (!newObject[getQuarter(new Date(item.date))]) {
          newObject[getQuarter(new Date(item.date))] = item.profit;
        } else {
          newObject[getQuarter(new Date(item.date))] += item.profit;
        }
      });
      btoOptions.forEach((item) => {
        if (!newObject[getQuarter(new Date(item.transactionDate))]) {
          newObject[getQuarter(new Date(item.transactionDate))] =
            item.premium * -1;
        } else {
          newObject[getQuarter(new Date(item.transactionDate))] -= item.premium;
        }
      });
      btcOptions.forEach((item) => {
        if (!newObject[getQuarter(new Date(item.transactionDate))]) {
          newObject[getQuarter(new Date(item.transactionDate))] =
            item.premium * -1;
        } else {
          newObject[getQuarter(new Date(item.transactionDate))] -= item.premium;
        }
      });
      stoOptions.forEach((item) => {
        if (!newObject[getQuarter(new Date(item.transactionDate))]) {
          newObject[getQuarter(new Date(item.transactionDate))] = item.premium;
        } else {
          newObject[getQuarter(new Date(item.transactionDate))] += item.premium;
        }
      });
      stcOptions.forEach((item) => {
        if (!newObject[getQuarter(new Date(item.transactionDate))]) {
          newObject[getQuarter(new Date(item.transactionDate))] = item.premium;
        } else {
          newObject[getQuarter(new Date(item.transactionDate))] += item.premium;
        }
      });
      dividends.forEach((item) => {
        if (!newObject[getQuarter(new Date(item.date))]) {
          newObject[getQuarter(new Date(item.date))] = item.amount;
        } else {
          newObject[getQuarter(new Date(item.date))] += item.amount;
        }
      });
      return newObject;
    });
    setYearlyReport(() => {
      const newObject: { [key: string]: any } = {};
      stockSales.forEach((item) => {
        if (!newObject[getYear(new Date(item.date))]) {
          newObject[getYear(new Date(item.date))] = item.profit;
        } else {
          newObject[getYear(new Date(item.date))] += item.profit;
        }
      });
      btoOptions.forEach((item) => {
        if (!newObject[getYear(new Date(item.transactionDate))]) {
          newObject[getYear(new Date(item.transactionDate))] =
            item.premium * -1;
        } else {
          newObject[getYear(new Date(item.transactionDate))] -= item.premium;
        }
      });
      btcOptions.forEach((item) => {
        if (!newObject[getYear(new Date(item.transactionDate))]) {
          newObject[getYear(new Date(item.transactionDate))] =
            item.premium * -1;
        } else {
          newObject[getYear(new Date(item.transactionDate))] -= item.premium;
        }
      });
      stoOptions.forEach((item) => {
        if (!newObject[getYear(new Date(item.transactionDate))]) {
          newObject[getYear(new Date(item.transactionDate))] = item.premium;
        } else {
          newObject[getYear(new Date(item.transactionDate))] += item.premium;
        }
      });
      stcOptions.forEach((item) => {
        if (!newObject[getYear(new Date(item.transactionDate))]) {
          newObject[getYear(new Date(item.transactionDate))] = item.premium;
        } else {
          newObject[getYear(new Date(item.transactionDate))] += item.premium;
        }
      });
      dividends.forEach((item) => {
        if (!newObject[getYear(new Date(item.date))]) {
          newObject[getYear(new Date(item.date))] = item.amount;
        } else {
          newObject[getYear(new Date(item.date))] += item.amount;
        }
      });
      return newObject;
    });
  }, [stockSales, btoOptions, btcOptions, stoOptions, stcOptions, dividends]);

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
