import TransactionView from "../../models/TransactionView";
import FinancialHistoryRow from "./FinancialHistoryRow";
import "./FinancialHistoryTable.css";

interface Props {
  search: string;
  topItem: number;
  transactions: TransactionView[];
}

const FinancialHistoryTable = ({ search, topItem, transactions }: Props) => {
  return (
    <table className="FinancialHistoryTable">
      <thead>
        <tr>
          <th>Date</th>
          <th>Ticker</th>
          <th>Transaction</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions
          .filter((item) => item.ticker.includes(search))
          .sort(
            (a, b) =>
              new Date(b.transactionDate).valueOf() -
              new Date(a.transactionDate).valueOf()
          )
          .slice(topItem, topItem + 20)
          .map((transaction, index) => (
            <FinancialHistoryRow key={index} transaction={transaction} />
          ))}
      </tbody>
    </table>
  );
};

export default FinancialHistoryTable;
