import Stock, {
  BuyToClose,
  BuyToOpen,
  SellToClose,
  SellToOpen,
} from "../models/Stock";
import { formatPercent } from "./formatFunctions";

const getPurchaseQuantity = (stock: Stock): number =>
  stock.stockPurchases.reduce((pv, cv) => cv.quantity + pv, 0);

const getSaleQuantity = (stock: Stock): number =>
  stock.stockSales.reduce((pv, cv) => cv.quantity + pv, 0);

export const getStockQuantity = (stock: Stock): number =>
  parseFloat((getPurchaseQuantity(stock) - getSaleQuantity(stock)).toFixed(4));

const getPurchaseCost = (stock: Stock): number =>
  stock.stockPurchases.reduce((pv, cv) => cv.cost + pv, 0);

export const getBTOCost = (stock: Stock): number =>
  stock.buyToOpenOptions.reduce((pv, cv) => cv.premium + pv, 0);

export const getBTCCost = (stock: Stock): number =>
  stock.buyToCloseOptions.reduce((pv, cv) => cv.premium + pv, 0);

export const getTotalDebits = (stock: Stock): number =>
  getPurchaseCost(stock) + getBTOCost(stock) + getBTCCost(stock);

export const getSaleCost = (stock: Stock): number =>
  stock.stockSales.reduce((pv, cv) => cv.cost + pv, 0);

export const getDividendReturns = (stock: Stock): number =>
  stock.dividends.reduce((pv, cv) => cv.amount + pv, 0);

export const getSTOReturns = (stock: Stock): number =>
  stock.sellToOpenOptions.reduce((pv, cv) => cv.premium + pv, 0);

export const getSTCReturns = (stock: Stock): number =>
  stock.sellToCloseOptions.reduce((pv, cv) => cv.premium + pv, 0);

export const getTotalCredits = (stock: Stock): number =>
  getSaleCost(stock) +
  getDividendReturns(stock) +
  getSTOReturns(stock) +
  getSTCReturns(stock);

export const getStockCostBasis = (stock: Stock): number =>
  getPurchaseCost(stock) - getSaleCost(stock);

export const getOpenOptions = (
  options: BuyToOpen[] | SellToOpen[]
): BuyToOpen[] => options.filter((item) => item.open);

export const getOpenOptionsCostBasis = (stock: Stock): number => {
  const openOptions = getOpenOptions(
    stock.buyToOpenOptions.concat(stock.sellToOpenOptions)
  );
  const cash: BuyToOpen[] | SellToOpen[] = openOptions.filter(
    (option) =>
      (option.callPut === "P" && option.type === "STO") ||
      (option.callPut === "C" && option.type === "BTO")
  );
  return cash.reduce((pv, cv) => cv.strike * 100 + pv, 0);
};

export const getTotalCostBasis = (stock: Stock): number =>
  getStockQuantity(stock)
    ? getStockCostBasis(stock) + getOpenOptionsCostBasis(stock)
    : getOpenOptionsCostBasis(stock);

export const getOptionsTotalPremium = (stock: Stock): number =>
  stock.sellToOpenOptions.reduce((pv, cv) => cv.premium + pv, 0) +
  stock.sellToCloseOptions.reduce((pv, cv) => cv.premium + pv, 0) -
  stock.buyToOpenOptions.reduce((pv, cv) => cv.premium + pv, 0) -
  stock.buyToCloseOptions.reduce((pv, cv) => cv.premium + pv, 0);

export const getCloseOptionsTotalPremium = (
  options: BuyToClose[] | SellToClose[]
): number => options.reduce((pv, cv) => cv.premium + pv, 0);

export const getSharesCommittedToOptions = (stock: Stock): number => {
  const openBTOPut: BuyToOpen[] = stock.buyToOpenOptions.filter(
    (item) => item.open && item.callPut === "P"
  );
  const openSTOCall: SellToOpen[] = stock.sellToOpenOptions.filter(
    (item) => item.open && item.callPut === "C"
  );
  return (openBTOPut.length + openSTOCall.length) * 100;
};

export const getTotalProfit = (stock: Stock): number =>
  getStockQuantity(stock)
    ? getTotalCredits(stock) -
      (getTotalDebits(stock) - getStockCostBasis(stock))
    : getTotalCredits(stock) - getTotalDebits(stock);

export const getPercentReturn = (stock: Stock): number | string =>
  getTotalCostBasis(stock)
    ? formatPercent(getTotalProfit(stock) / getTotalCostBasis(stock))
    : "N/A";
