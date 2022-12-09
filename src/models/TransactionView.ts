export default interface TransactionView {
  ticker: string;
  transactionType: string;
  transactionName: string;
  stockQuantity?: number;
  transactionDescription?: string;
  transactionDate: string;
  transactionAmount: string;
  optionExpiration?: string;
}
