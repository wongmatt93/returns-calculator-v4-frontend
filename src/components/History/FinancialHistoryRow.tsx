import TransactionView from "../../models/TransactionView";
import "./FinancialHistoryRow.css";

interface Props {
  transaction: TransactionView;
}

const FinancialHistoryRow = ({ transaction }: Props) => {
  return (
    <tr className="FinancialHistoryRow">
      <td>{transaction.transactionDate}</td>
      <td>{transaction.ticker}</td>
      <td>{transaction.transactionName}</td>
      <td>
        {transaction.transactionDescription &&
          transaction.transactionDescription}
      </td>
      <td>{transaction.transactionAmount}</td>
    </tr>
  );
};

export default FinancialHistoryRow;
