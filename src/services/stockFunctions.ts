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
