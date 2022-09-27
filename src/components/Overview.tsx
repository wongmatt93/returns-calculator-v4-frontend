import AddStockForm from "./AddStockForm";
import "./Overview.css";
import StockTable from "./StockTable";
import Totals from "./Totals";

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
