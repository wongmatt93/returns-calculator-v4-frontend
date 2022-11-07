import { FormEvent, useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import "./AddStockForm.css";

const AddStockForm = () => {
  const { user, stocks, addStock } = useContext(AuthContext);
  const [ticker, setTicker] = useState("");

  const handleSubmit = (e: FormEvent): void => {
    if (user) {
      e.preventDefault();
      if (stocks.find((stock) => stock.ticker === ticker)) {
        alert(`${ticker} has already been added`);
      } else {
        addStock(
          {
            ticker,
            stockPurchases: [],
            stockSales: [],
            buyToOpenOptions: [],
            buyToCloseOptions: [],
            sellToOpenOptions: [],
            sellToCloseOptions: [],
            dividends: [],
          },
          user.uid
        );
      }
    }
  };

  return (
    <div className="AddStockForm">
      {" "}
      <form className="AddStockForm" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="ticker">Stock Ticker</label>
        <input
          type="text"
          name="ticker"
          id="ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          required
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddStockForm;
