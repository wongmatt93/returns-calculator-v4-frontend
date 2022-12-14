import { Dividend } from "../../../models/Stock";
import DividendRow from "./DividendRow";
import "./DividendTable.css";

interface Props {
  dividends: Dividend[];
}

const DividendTable = ({ dividends }: Props) => {
  return (
    <table className="DividendTable">
      <caption>Dividends</caption>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {dividends.map((dividend, index) => (
          <DividendRow dividend={dividend} key={index} />
        ))}
      </tbody>
    </table>
  );
};

export default DividendTable;
