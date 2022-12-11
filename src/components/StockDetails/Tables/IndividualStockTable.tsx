import Stock from "../../../models/Stock";
import { formatMoney } from "../../../services/formatFunctions";
import {
  getStockQuantity,
  getTotalCredits,
  getTotalDebits,
} from "../../../services/stockFunctions";
import "./IndividualStockTable.css";

interface Props {
  stock: Stock;
}

const IndividualStockTable = ({ stock }: Props) => {
  return (
    <table className="IndividualStockTable">
      <caption>Current Stock Position</caption>
      <thead>
        <tr>
          <th>Total Credits</th>
          <th>Total Debits</th>
          <th>Profit</th>
          <th>Break Even</th>
          <th># of Shares</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{formatMoney(getTotalCredits(stock))}</td>
          <td>{formatMoney(getTotalDebits(stock))}</td>
          <td>{formatMoney(getTotalCredits(stock) - getTotalDebits(stock))}</td>
          <td>
            {getStockQuantity(stock)
              ? formatMoney(
                  ((getTotalCredits(stock) - getTotalDebits(stock)) /
                    getStockQuantity(stock)) *
                    -1
                )
              : "N/A"}
          </td>
          <td>{getStockQuantity(stock)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default IndividualStockTable;
