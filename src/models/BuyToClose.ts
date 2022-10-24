export default interface BuyToClose {
  type: string;
  transactionDate: string;
  callPut: string;
  strike: number;
  expirationDate: string;
  premium: number;
}
