import Stock from "../../models/Stock";
import ClosedStockRow from "./ClosedStockRow";
import "./ClosedStockTable.css";

interface Props {
  closedPositions: Stock[];
}

const ClosedStockTable = ({ closedPositions }: Props) => {
  return (
    <table className="ClosedStockTable">
      <caption>Inactive Positions</caption>
      <thead>
        <tr>
          <th className="ticker-cell">Ticker</th>
          <th className="cash-returns-cell">Cash Returns</th>
        </tr>
      </thead>
      <tbody>
        {closedPositions.length ? (
          closedPositions
            .sort(function (a, b) {
              return a.ticker < b.ticker ? -1 : a.ticker > b.ticker ? 1 : 0;
            })
            .map((stock) => <ClosedStockRow stock={stock} key={stock.ticker} />)
        ) : (
          <tr>
            <td colSpan={2}>No Stocks Added</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ClosedStockTable;
