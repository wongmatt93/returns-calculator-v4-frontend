export default interface TransactionView {
  ticker: string;
  transactionType: string;
  transactionName: string;
  optionDescription?: string;
  transactionDate: string;
  transactionAmount: number;
}
