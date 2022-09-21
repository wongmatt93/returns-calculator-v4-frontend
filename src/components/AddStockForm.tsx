import { FormEvent, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import "./AddStockForm.css";

const AddStockForm = () => {
  const { user, stocks, addStock } = useContext(AuthContext);
  const [ticker, setTicker] = useState("");

  const handleSubmit = (e: FormEvent): void => {
    if (user) {
      e.preventDefault();
      const newTicker = ticker.toUpperCase();
      if (stocks.find((stock) => stock.ticker === newTicker)) {
        alert(`${newTicker} has already been added`);
      } else {
        addStock(
          {
            ticker: newTicker,
            stockPurchases: [],
            stockSales: [],
            options: [],
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
          onChange={(e) => setTicker(e.target.value)}
          required
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddStockForm;
