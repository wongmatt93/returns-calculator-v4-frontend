import AddStockForm from "./Forms/AddStockForm";
import "./PortfolioOverview.css";
import StockTable from "./Tables/StockTable";
import Totals from "./Tables/Totals";

const PortfolioOverview = () => {
  return (
    <main className="PortfolioOverview">
      <Totals />
      <AddStockForm />
      <StockTable />
    </main>
  );
};

export default PortfolioOverview;
