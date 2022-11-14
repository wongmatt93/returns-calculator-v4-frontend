import { useState } from "react";
import "./ResearchPage.css";
import SearchStockForm from "./SearchStockForm";
import StockInformation from "./StockInformation";

const ResearchPage = () => {
  const [ticker, setTicker] = useState<string>("");

  return (
    <main className="ResearchPage">
      <SearchStockForm setTicker={setTicker} />
      <StockInformation ticker={ticker} />
    </main>
  );
};

export default ResearchPage;
