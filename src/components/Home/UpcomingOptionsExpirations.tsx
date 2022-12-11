import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import TransactionView from "../../models/TransactionView";
import { formatMoney } from "../../services/formatFunctions";
import "./UpcomingOptionsExpirations.css";

const UpcomingOptionsExpirations = () => {
  const { stocks } = useContext(AuthContext);
  const [openOptions, setOpenOptions] = useState<TransactionView[]>([]);
  const [expirationDates, setExpirationDates] = useState<{
    [key: string]: TransactionView[];
  }>({});

  useEffect(() => {
    stocks.forEach((stock) => {
      stock.sellToOpenOptions.forEach((item) => {
        if (item.open) {
          const transactionObject: TransactionView = {
            ticker: stock.ticker,
            transactionName: "Sell To Close",
            transactionType: "option",
            transactionDescription: `${item.expirationDate} ${formatMoney(
              item.strike
            )} ${item.callPut}`,
            transactionDate: item.transactionDate,
            transactionAmount: formatMoney(item.premium),
            optionExpiration: item.expirationDate,
          };
          setOpenOptions((prev) => [...prev, transactionObject]);
        }
      });
      stock.buyToOpenOptions.forEach((item) => {
        if (item.open) {
          const transactionObject: TransactionView = {
            ticker: stock.ticker,
            transactionName: "Sell To Close",
            transactionType: "option",
            transactionDescription: `${item.expirationDate} ${formatMoney(
              item.strike
            )} ${item.callPut}`,
            transactionDate: item.transactionDate,
            transactionAmount: formatMoney(item.premium),
            optionExpiration: item.expirationDate,
          };
          setOpenOptions((prev) => [...prev, transactionObject]);
        }
      });
    });
  }, [stocks]);

  useEffect(() => {
    setExpirationDates(() => {
      const newObject: { [key: string]: any } = {};
      openOptions.forEach((item) => {
        if (!newObject[item.optionExpiration!]) {
          newObject[item.optionExpiration!] = [];
          newObject[item.optionExpiration!].push(item);
        } else {
          newObject[item.optionExpiration!].push(item);
        }
      });
      return newObject;
    });
  }, [openOptions]);

  return (
    <div className="UpcomingOptionsExpirations">
      <h3>Upcoming Options Expiration</h3>
      <ul>
        {Object.keys(expirationDates)
          .sort()
          .map((item, index) => (
            <li key={index}>
              <h4>{item}</h4>
              <ul>
                {expirationDates[item].map((item, index) => (
                  <li key={index}>
                    <p>{`${item.ticker} ${item.transactionDescription}`}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UpcomingOptionsExpirations;
