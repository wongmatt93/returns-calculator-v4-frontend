export interface BuyToOpen {
  type: string;
  transactionDate: string;
  callPut: string;
  strike: number;
  expirationDate: string;
  premium: number;
  open: boolean;
}

export interface BuyToClose {
  type: string;
  transactionDate: string;
  callPut: string;
  strike: number;
  expirationDate: string;
  premium: number;
}

export interface SellToOpen {
  type: string;
  transactionDate: string;
  callPut: string;
  strike: number;
  expirationDate: string;
  premium: number;
  open: boolean;
}

export interface SellToClose {
  type: string;
  transactionDate: string;
  callPut: string;
  strike: number;
  expirationDate: string;
  premium: number;
}

export interface StockPurchase {
  quantity: number;
  cost: number;
  date: string;
}

export interface StockSale {
  quantity: number;
  cost: number;
  profit: number;
  date: string;
}

export interface Dividend {
  amount: number;
  date: string;
}

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
