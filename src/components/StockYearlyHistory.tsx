import TransactionView from "../models/TransactionView";
import "./StockYearlyHistory.css";

interface Props {
  year: string;
  buySell: boolean;
  option: boolean;
  dividend: boolean;
  transactions: TransactionView[];
}

const StockYearlyHistory = ({
  year,
  transactions,
  buySell,
  option,
  dividend,
}: Props) => {
  return (
    <li className="StockYearlyHistory">
      <h3>{year}</h3>
      <ul>
        {transactions.map((item, index) => (
          <li
            key={index}
            style={{
              display:
                (!buySell && item.transactionType === "buySell") ||
                (!option && item.transactionType === "option") ||
                (!dividend && item.transactionType === "dividend")
                  ? "none"
                  : "block",
            }}
          >
            <h4>{item.ticker}</h4>
            <p>{item.transactionAmount}</p>
            {item.optionDescription && <p>{item.optionDescription}</p>}
            <p>{item.transactionName}</p>
            <p>{item.transactionDate}</p>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default StockYearlyHistory;
