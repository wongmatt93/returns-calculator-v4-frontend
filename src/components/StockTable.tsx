import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import StockRow from "./StockRow";
import "./StockTable.css";

const StockTable = () => {
  const { stocks } = useContext(AuthContext);
  console.log(stocks);

  return (
    <table className="StockTable">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Cost Basis</th>
          <th>Cash Returns</th>
          <th>Returns %</th>
        </tr>
      </thead>
      <tbody>
        {stocks.length ? (
          stocks.map((stock) => <StockRow stock={stock} key={stock.ticker} />)
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
