import { useNavigate } from "react-router-dom";
import Stock from "../../models/Stock";
import { formatMoney } from "../../services/formatFunctions";
import { getTotalProfit } from "../../services/stockFunctions";
import "./ClosedStockRow.css";

interface Props {
  stock: Stock;
}

const ClosedStockRow = ({ stock }: Props) => {
  const navigate = useNavigate();

  const handleClick = (): void =>
    navigate(`/stocks/${encodeURIComponent(stock.ticker)}/details`);

  return (
    <tr className="ClosedStockRow">
      <td onClick={() => handleClick()} className="ticker-cell">
        {stock.ticker}
      </td>
      <td>{formatMoney(getTotalProfit(stock))}</td>
    </tr>
  );
};

export default ClosedStockRow;
