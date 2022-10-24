import BuyToClose from "../models/BuyToClose";
import BuyToOpen from "../models/BuyToOpen";
import SellToClose from "../models/SellToClose";
import SellToOpen from "../models/SellToOpen";
import Stock from "../models/Stock";

const getPurchaseQuantity = (stock: Stock): number =>
  stock.stockPurchases.reduce((pv, cv) => cv.quantity + pv, 0);

const getSaleQuantity = (stock: Stock): number =>
  stock.stockSales.reduce((pv, cv) => cv.quantity + pv, 0);

const getPurchaseCost = (stock: Stock): number =>
  stock.stockPurchases.reduce((pv, cv) => cv.cost + pv, 0);

export const getSaleCost = (stock: Stock): number =>
  stock.stockSales.reduce((pv, cv) => cv.cost + pv, 0);

export const getStockQuantity = (stock: Stock): number =>
  getPurchaseQuantity(stock) - getSaleQuantity(stock);

export const getCostBasis = (stock: Stock): number =>
  getSaleQuantity(stock)
    ? getPurchaseCost(stock) -
      (getPurchaseCost(stock) / getPurchaseQuantity(stock)) *
        getSaleQuantity(stock)
    : getPurchaseCost(stock);

export const getSaleReturns = (stock: Stock): number =>
  stock.stockSales.reduce((pv, cv) => cv.profit + pv, 0);

export const getDividendReturns = (stock: Stock): number =>
  stock.dividends.reduce((pv, cv) => cv.amount + pv, 0);

export const getCashReturns = (stock: Stock): number =>
  getSaleReturns(stock) + getDividendReturns(stock);

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

export const getOptionsTotalPremium = (stock: Stock): number => {
  const openTotal: number = stock.buyToOpenOptions
    .concat(stock.sellToOpenOptions)
    .reduce((pv, cv) => cv.premium + pv, 0);
  const closeTotal: number = stock.buyToCloseOptions
    .concat(stock.sellToCloseOptions)
    .reduce((pv, cv) => cv.premium + pv, 0);

  return openTotal - closeTotal;
};

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
