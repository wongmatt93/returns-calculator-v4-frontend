const formatPercent = (number: number): string => {
  return `${(number * 100)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%`;
};

const formatMoney = (money: number): string => {
  return `$${money
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export { formatPercent, formatMoney };
