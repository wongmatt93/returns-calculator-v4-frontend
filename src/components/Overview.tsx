import AddStockForm from "./Forms/AddStockForm";
import "./Overview.css";
import StockTable from "./Tables/StockTable";
import Totals from "./Tables/Totals";

const Overview = () => {
  return (
    <main className="Overview">
      <Totals />
      <AddStockForm />
      <StockTable />
    </main>
  );
};

export default Overview;
