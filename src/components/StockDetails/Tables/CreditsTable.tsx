import TransactionView from "../../../models/TransactionView";
import "./CreditsTable.css";

interface Props {
  creditTransactions: TransactionView[];
}

const CreditsTable = ({ creditTransactions }: Props) => {
  return (
    <table className="CreditsTable">
      <caption>Credits</caption>
      <thead>
        <tr>
          <th>Date</th>
          <th>Transaction</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {creditTransactions
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

export default CreditsTable;
