import StockPurchase from "./StockPurchase";
import StockSale from "./StockSale";
import Dividend from "./Dividend";
import BuyToOpen from "./BuyToOpen";
import SellToOpen from "./SellToOpen";
import SellToClose from "./SellToClose";
import BuyToClose from "./BuyToClose";

export default interface Stock {
  ticker: string;
  stockPurchases: StockPurchase[];
  stockSales: StockSale[];
  buyToOpenOptions: BuyToOpen[];
  buyToCloseOptions: BuyToClose[];
  sellToOpenOptions: SellToOpen[];
  sellToCloseOptions: SellToClose[];
  dividends: Dividend[];
}
