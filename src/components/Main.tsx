import AddStockForm from "./AddStockForm";
import "./Main.css";
import StockTable from "./StockTable";
import Totals from "./Totals";

const Main = () => {
  return (
    <main className="Main">
      <Totals />
      <AddStockForm />
      <StockTable />
    </main>
  );
};

export default Main;
