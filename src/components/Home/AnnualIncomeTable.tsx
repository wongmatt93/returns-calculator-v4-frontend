import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import BuyToClose from "../../models/BuyToClose";
import BuyToOpen from "../../models/BuyToOpen";
import Dividend from "../../models/Dividend";
import SellToClose from "../../models/SellToClose";
import SellToOpen from "../../models/SellToOpen";
import "./AnnualIncomeTable.css";
import AnnualIncomeRow from "./AnnualIncomeRow";

const AnnualIncomeTable = () => {
  const { stocks } = useContext(AuthContext);

  const [btoOptions, setBTOOptions] = useState<BuyToOpen[]>([]);
  const [btcOptions, setBTCOptions] = useState<BuyToClose[]>([]);
  const [stoOptions, setSTOOptions] = useState<SellToOpen[]>([]);
  const [stcOptions, setSTCOptions] = useState<SellToClose[]>([]);
  const [dividends, setDividends] = useState<Dividend[]>([]);
  const [quarterlyReport, setQuarterlyReport] = useState<{
    [key: string]: any;
  }>({});
  const [yearlyReport, setYearlyReport] = useState<{ [key: string]: any }>({});

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
  }, [stocks]);

  useEffect(() => {
    setQuarterlyReport(() => {
      const newObject: { [key: string]: any } = {};
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
  }, [btoOptions, btcOptions, stoOptions, stcOptions, dividends]);

  return (
    <table className="AnnualIncomeTable">
      <caption>Annual Income</caption>
      <thead>
        <tr>
          <th>Year</th>
          <th>Net</th>
          <th>% Change</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(yearlyReport)
          .sort()
          .map((item, index) => (
            <AnnualIncomeRow
              key={index}
              year={item}
              total={yearlyReport[item]}
              prevTotal={yearlyReport[Object.keys(yearlyReport)[index - 1]]}
              quarterlies={quarterlyReport}
            />
          ))}
      </tbody>
    </table>
  );
};

export default AnnualIncomeTable;