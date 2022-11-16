import Stock from "../../models/Stock";
import OpenStockRow from "./OpenStockRow";
import "./OpenStockTable.css";

interface Props {
  openPositions: Stock[];
  total: number;
}

const OpenStockTable = ({ openPositions, total }: Props) => {
  return (
    <table className="OpenStockTable">
      <caption>Active Positions</caption>
      <thead>
        <tr>
          <th className="ticker-cell">Ticker</th>
          <th className="options-cell">Open Options</th>
          <th className="cost-basis-cell">Cost Basis</th>
          <th className="percent-portfolio">% of Portfolio</th>
          <th className="cash-returns-cell">Cash Returns</th>
          <th className="returns-cell">% Return</th>
        </tr>
      </thead>
      <tbody>
        {openPositions.length ? (
          openPositions
            .sort(function (a, b) {
              return a.ticker < b.ticker ? -1 : a.ticker > b.ticker ? 1 : 0;
            })
            .map((stock) => (
              <OpenStockRow stock={stock} total={total} key={stock.ticker} />
            ))
        ) : (
          <tr>
            <td colSpan={6}>No Stocks Added</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OpenStockTable;
