import AddStockForm from "./AddStockForm";
import "./PortfolioOverview.css";
import StockTable from "./StockTable";

const PortfolioOverview = () => {
  return (
    <main className="PortfolioOverview">
      <AddStockForm />
      <StockTable />
    </main>
  );
};

export default PortfolioOverview;
