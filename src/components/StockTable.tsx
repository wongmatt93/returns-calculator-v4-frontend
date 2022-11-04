import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import StockRow from "./StockRow";
import "./StockTable.css";

const StockTable = () => {
  const { stocks } = useContext(AuthContext);

  return (
    <table className="StockTable">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Cost Basis</th>
          <th>Cash Returns</th>
          <th>% Return</th>
        </tr>
      </thead>
      <tbody>
        {stocks.length ? (
          stocks
            .sort(function (a, b) {
              const textA = a.ticker;
              const textB = b.ticker;
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            })
            .map((stock) => <StockRow stock={stock} key={stock.ticker} />)
        ) : (
          <tr>
            <td colSpan={4}>No Stocks Added</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StockTable;
