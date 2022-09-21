import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { formatMoney, formatPercent } from "../services/formatFunctions";
import { getCashReturns, getCostBasis } from "../services/stockFunctions";
import "./Totals.css";

const Totals = () => {
  const { stocks } = useContext(AuthContext);
  const [costBasis, setCostBasis] = useState(0);
  const [cashReturn, setCashReturn] = useState(0);

  useEffect(() => {
    let totalCost: number = 0;
    let totalCash: number = 0;

    if (stocks.length) {
      stocks.forEach((stock) => {
        totalCost += getCostBasis(stock);
        totalCash += getCashReturns(stock);
      });
    }

    setCostBasis(totalCost);
    setCashReturn(totalCash);
  }, [stocks]);

  return (
    <table className="Totals">
      <caption>Totals</caption>
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
          <td>{cashReturn ? formatPercent(cashReturn, costBasis) : "N/A"}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Totals;
