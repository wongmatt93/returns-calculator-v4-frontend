import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BuyToOpen from "../../models/BuyToOpen";
import SellToOpen from "../../models/SellToOpen";
import Stock from "../../models/Stock";
import { formatMoney, formatPercent } from "../../services/formatFunctions";
import {
  getPercentReturn,
  getTotalCostBasis,
  getTotalProfit,
} from "../../services/stockFunctions";
import "./OpenStockRow.css";

interface Props {
  stock: Stock;
  total: number;
}

const OpenStockRow = ({ stock, total }: Props) => {
  const navigate = useNavigate();
  const [openBTO, setOpenBTO] = useState<BuyToOpen[]>([]);
  const [openSTO, setOpenSTO] = useState<SellToOpen[]>([]);
  const [isHoveringBTO, setIsHoveringBTO] = useState<boolean>(false);
  const [isHoveringSTO, setIsHoveringSTO] = useState<boolean>(false);

  const handleMouseOverBTO = (): void => setIsHoveringBTO(true);
  const handleMouseOutBTO = (): void => setIsHoveringBTO(false);
  const handleMouseOverSTO = (): void => setIsHoveringSTO(true);
  const handleMouseOutSTO = (): void => setIsHoveringSTO(false);

  const handleClick = (): void =>
    navigate(`/stocks/${encodeURIComponent(stock.ticker)}/details`);

  useEffect(() => {
    setOpenBTO(stock.buyToOpenOptions.filter((item) => item.open));
    setOpenSTO(stock.sellToOpenOptions.filter((item) => item.open));
  }, [stock]);

  return (
    <tr className="OpenStockRow">
      <td onClick={() => handleClick()} className="ticker-cell">
        {stock.ticker}
      </td>
      <td className="open-option-cell">
        <div className="open-options-container">
          <div className="open-options-pill">
            <div
              className="open-option open-bto"
              onMouseOver={handleMouseOverBTO}
              onMouseOut={handleMouseOutBTO}
            >
              BTO: {openBTO.length}
            </div>
            {isHoveringBTO && openBTO.length > 0 && (
              <ul className="open-option-list">
                {openBTO.map((option, index) => (
                  <li key={index}>
                    {`${option.expirationDate} ${option.strike} ${option.callPut}`}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="open-options-pill">
            <div
              className="open-option open-sto"
              onMouseOver={handleMouseOverSTO}
              onMouseOut={handleMouseOutSTO}
            >
              STO: {openSTO.length}
            </div>
            {isHoveringSTO && openSTO.length > 0 && (
              <ul className="open-option-list">
                {openSTO.map((option, index) => (
                  <li key={index}>
                    {`${option.expirationDate} ${option.strike} ${option.callPut}`}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </td>
      <td>{formatMoney(getTotalCostBasis(stock))}</td>
      <td>{formatPercent(getTotalCostBasis(stock) / total)}</td>
      <td>{formatMoney(getTotalProfit(stock))}</td>
      <td>{getPercentReturn(stock)}</td>
    </tr>
  );
};

export default OpenStockRow;
