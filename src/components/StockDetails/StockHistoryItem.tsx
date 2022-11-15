import TransactionView from "../../models/TransactionView";
import "./StockHistoryItem.css";

interface Props {
  transaction: TransactionView;
  buySell: boolean;
  option: boolean;
  dividend: boolean;
}

const StockHistoryItem = ({
  transaction,
  buySell,
  option,
  dividend,
}: Props) => {
  return (
    <li
      className="StockHistoryItem"
      style={{
        display:
          (!buySell && transaction.transactionType === "buySell") ||
          (!option && transaction.transactionType === "option") ||
          (!dividend && transaction.transactionType === "dividend")
            ? "none"
            : "block",
      }}
    >
      <h4>{transaction.transactionName}</h4>
      {transaction.transactionDescription && (
        <p>{transaction.transactionDescription}</p>
      )}
      {transaction.stockQuantity && <p>{transaction.stockQuantity}</p>}
      <p>{transaction.transactionAmount}</p>
      <p>{transaction.transactionDate}</p>
    </li>
  );
};

export default StockHistoryItem;
