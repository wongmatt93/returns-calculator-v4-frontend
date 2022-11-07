import TransactionView from "../models/TransactionView";
import "./FinancialHistoryItem.css";

interface Props {
  transaction: TransactionView;
}

const FinancialHistoryItem = ({ transaction }: Props) => {
  return (
    <li className="FinancialHistoryItem">
      <h3>{transaction.ticker}</h3>
      <p>{transaction.transactionName}</p>
      {transaction.optionDescription && <p>{transaction.optionDescription}</p>}
      {transaction.stockQuantity && <p>{transaction.stockQuantity}</p>}
      <p>{transaction.transactionAmount}</p>
      <p>{transaction.transactionDate}</p>
    </li>
  );
};

export default FinancialHistoryItem;
