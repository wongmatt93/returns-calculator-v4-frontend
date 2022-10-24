import { useNavigate } from "react-router-dom";
import Stock from "../models/Stock";
import { formatMoney, formatPercent } from "../services/formatFunctions";
import {
  getCashReturns,
  getCostBasis,
  getOpenOptionsCostBasis,
  getOptionsTotalPremium,
} from "../services/stockFunctions";
import "./StockRow.css";

interface Props {
  stock: Stock;
}

const StockRow = ({ stock }: Props) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(`/stocks/${encodeURIComponent(stock.ticker)}/details`);
  };

  return (
    <tr className="StockRow">
      <td onClick={() => handleClick()}>{stock.ticker}</td>
      <td>
        {formatMoney(getCostBasis(stock) + getOpenOptionsCostBasis(stock))}
      </td>
      <td>
        {formatMoney(getCashReturns(stock) + getOptionsTotalPremium(stock))}
      </td>
      <td>
        {getCashReturns(stock) + getOptionsTotalPremium(stock) &&
        getCostBasis(stock) + getOpenOptionsCostBasis(stock)
          ? formatPercent(
              getCashReturns(stock) + getOptionsTotalPremium(stock),
              getCostBasis(stock) + getOpenOptionsCostBasis(stock)
            )
          : "N/A"}
      </td>
    </tr>
  );
};

export default StockRow;
