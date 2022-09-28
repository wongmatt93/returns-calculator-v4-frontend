import BuyToOpen from "../models/BuyToOpen";
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

export const getOpenBTO = (bto: BuyToOpen[]): BuyToOpen[] =>
  bto.filter((item) => item.open);

export const getOpenSTO = (sto: SellToOpen[]): SellToOpen[] =>
  sto.filter((item) => item.open);

export const getSharesCommittedToOptions = (stock: Stock): number => {
  const openBTOPut: BuyToOpen[] = stock.buyToOpenOptions.filter(
    (item) => item.open && item.callPut === "P"
  );
  const openSTOCall: SellToOpen[] = stock.sellToOpenOptions.filter(
    (item) => item.open && item.callPut === "C"
  );
  return (openBTOPut.length + openSTOCall.length) * 100;
};
