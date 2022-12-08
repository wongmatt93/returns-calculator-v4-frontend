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

  const getYear = (date = new Date()): string => date.getFullYear().toString();

  const getQuarter = (date = new Date()): string =>
    `${date.getFullYear().toString()} Q${Math.floor(
      date.getMonth() / 3 + 1
    ).toString()}`;

  useEffect(() => {
    setBTOOptions([]);
    setBTCOptions([]);
    setSTOOptions([]);
    setSTCOptions([]);
    setDividends([]);
    stocks.forEach((stock) => {
      setBTOOptions((prev) => [...prev, ...stock.buyToOpenOptions]);
      setBTCOptions((prev) => [...prev, ...stock.buyToCloseOptions]);
      setSTOOptions((prev) => [...prev, ...stock.sellToOpenOptions]);
      setSTCOptions((prev) => [...prev, ...stock.sellToCloseOptions]);
      setDividends((prev) => [...prev, ...stock.dividends]);
    });
  }, [stocks]);

  useEffect(() => {
    setQuarterlyReport(() => {
      const newObject: { [key: string]: any } = {};
      btoOptions.forEach((item) => {
        const date: string = getQuarter(new Date(item.transactionDate));
        !newObject[date]
          ? (newObject[date] = item.premium * -1)
          : (newObject[date] -= item.premium);
      });
      btcOptions.forEach((item) => {
        const date: string = getQuarter(new Date(item.transactionDate));
        !newObject[date]
          ? (newObject[date] = item.premium * -1)
          : (newObject[date] -= item.premium);
      });
      stoOptions.forEach((item) => {
        const date: string = getQuarter(new Date(item.transactionDate));
        !newObject[date]
          ? (newObject[date] = item.premium)
          : (newObject[date] += item.premium);
      });
      stcOptions.forEach((item) => {
        const date: string = getQuarter(new Date(item.transactionDate));
        !newObject[date]
          ? (newObject[date] = item.premium)
          : (newObject[date] += item.premium);
      });
      dividends.forEach((item) => {
        const date: string = getQuarter(new Date(item.date));
        !newObject[date]
          ? (newObject[date] = item.amount)
          : (newObject[date] += item.amount);
      });
      return newObject;
    });
    setYearlyReport(() => {
      const newObject: { [key: string]: any } = {};
      btoOptions.forEach((item) => {
        const date: string = getYear(new Date(item.transactionDate));
        !newObject[date]
          ? (newObject[date] = item.premium * -1)
          : (newObject[date] -= item.premium);
      });
      btcOptions.forEach((item) => {
        const date: string = getYear(new Date(item.transactionDate));
        !newObject[date]
          ? (newObject[date] = item.premium * -1)
          : (newObject[date] -= item.premium);
      });
      stoOptions.forEach((item) => {
        const date: string = getYear(new Date(item.transactionDate));
        !newObject[date]
          ? (newObject[date] = item.premium)
          : (newObject[date] += item.premium);
      });
      stcOptions.forEach((item) => {
        const date: string = getYear(new Date(item.transactionDate));
        !newObject[date]
          ? (newObject[date] = item.premium)
          : (newObject[date] += item.premium);
      });
      dividends.forEach((item) => {
        const date: string = getYear(new Date(item.date));
        !newObject[date]
          ? (newObject[date] = item.amount)
          : (newObject[date] += item.amount);
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
