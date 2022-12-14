import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { formatMoney, formatPercent } from "../../services/formatFunctions";
import {
  getTotalCostBasis,
  getTotalProfit,
} from "../../services/stockFunctions";
import "./TotalsTable.css";

const TotalsTable = () => {
  const { stocks } = useContext(AuthContext);
  const [costBasis, setCostBasis] = useState(0);
  const [cashReturn, setCashReturn] = useState(0);

  useEffect(() => {
    let totalCost: number = 0;
    let totalCash: number = 0;

    if (stocks.length) {
      stocks.forEach((stock) => {
        totalCost += getTotalCostBasis(stock);
        totalCash += getTotalProfit(stock);
      });
    }

    setCostBasis(totalCost);
    setCashReturn(totalCash);
  }, [stocks]);

  return (
    <table className="TotalsTable">
      <caption>Overall Total</caption>
      <thead>
        <tr>
          <th>Cost Basis</th>
          <th>Cash Return</th>
          <th>Percent %</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{formatMoney(costBasis)}</td>
          <td>{formatMoney(cashReturn)}</td>
          <td>{costBasis ? formatPercent(cashReturn / costBasis) : "N/A"}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TotalsTable;
