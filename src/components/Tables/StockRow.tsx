import { useNavigate } from "react-router-dom";
import Stock from "../../models/Stock";
import { formatMoney } from "../../services/formatFunctions";
import {
  getPercentReturn,
  getTotalCostBasis,
  getTotalProfit,
} from "../../services/stockFunctions";
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
      <td>{formatMoney(getTotalCostBasis(stock))}</td>
      <td>{formatMoney(getTotalProfit(stock))}</td>
      <td>{getPercentReturn(stock)}</td>
    </tr>
  );
};

export default StockRow;
