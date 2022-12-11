import TransactionView from "../../../models/TransactionView";
import "./DebitsTable.css";

interface Props {
  debitTransactions: TransactionView[];
}

const DebitsTable = ({ debitTransactions }: Props) => {
  return (
    <table className="DebitsTable">
      <caption>Debits</caption>
      <thead>
        <tr>
          <th>Date</th>
          <th>Transaction</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {debitTransactions
          .sort(
            (a, b) =>
              new Date(b.transactionDate).valueOf() -
              new Date(a.transactionDate).valueOf()
          )
          .map((item, index) => (
            <tr key={index}>
              <td>{item.transactionDate}</td>
              <td>{item.transactionDescription}</td>
              <td>{item.transactionAmount}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default DebitsTable;
