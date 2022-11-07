export default interface TransactionView {
  ticker: string;
  transactionType: string;
  transactionName: string;
  stockQuantity?: number;
  optionDescription?: string;
  transactionDate: string;
  transactionAmount: number;
}
