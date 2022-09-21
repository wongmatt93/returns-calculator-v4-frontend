export default interface Option {
  transactionDate: string;
  callPut: string;
  type: string;
  strike: number;
  expirationDate: string;
  premium: number;
  open?: boolean;
}
