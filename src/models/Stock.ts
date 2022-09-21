import StockPurchase from "./StockPurchase";
import StockSale from "./StockSale";
import Dividend from "./Dividend";
import Option from "./Option";

export default interface Stock {
  ticker: string;
  stockPurchases: StockPurchase[];
  stockSales: StockSale[];
  options: Option[];
  dividends: Dividend[];
}
