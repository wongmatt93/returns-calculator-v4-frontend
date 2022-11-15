import AddStockForm from "./AddStockForm";
import "./PortfolioOverview.css";
import OpenStockTable from "./OpenStockTable";
import ClosedStockTable from "./ClosedStockTable";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Stock from "../../models/Stock";
import {
  getOpenOptions,
  getStockQuantity,
  getTotalCostBasis,
} from "../../services/stockFunctions";

const PortfolioOverview = () => {
  const { stocks } = useContext(AuthContext);
  const [openPositions, setOpenPositions] = useState<Stock[]>([]);
  const [closedPositions, setClosedPositions] = useState<Stock[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setOpenPositions(
      stocks.filter(
        (stock) =>
          getStockQuantity(stock) ||
          getOpenOptions(stock.buyToOpenOptions).length ||
          getOpenOptions(stock.sellToOpenOptions).length
      )
    );
    setClosedPositions(
      stocks.filter(
        (stock) =>
          !getStockQuantity(stock) &&
          !getOpenOptions(stock.buyToOpenOptions).length &&
          !getOpenOptions(stock.sellToOpenOptions).length
      )
    );

    let totalCost: number = 0;
    if (stocks.length) {
      totalCost = stocks.reduce((pv, cv) => getTotalCostBasis(cv) + pv, 0);
    }

    setTotal(totalCost);
  }, [stocks]);

  return (
    <main className="PortfolioOverview">
      <AddStockForm />
      <div className="stock-tables">
        <OpenStockTable openPositions={openPositions} total={total} />
        <ClosedStockTable closedPositions={closedPositions} />
      </div>
    </main>
  );
};

export default PortfolioOverview;
