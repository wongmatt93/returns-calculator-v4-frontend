export default interface AlphaVantageResponse {
  Symbol: string;
  Name: string;
  Sector: string;
  Description: string;
  DividendPerShare: string;
  DividendYield: string;
  DividendDate: string;
  PERatio: string;
  Beta: string;
  "52WeekHigh": string;
  "52WeekLow": string;
  "200DayMovingAverage": string;
  AnalystTargetPrice: string;
  BookValue: string;
  EPS: string;
  EBITDA: string;
  GrossProfitTTM: string;
  MarketCapitalization: string;
  PriceToBookRatio: string;
  PriceToSalesRatioTTM: string;
  ProfitMargin: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenuePerShareTTM: string;
  RevenueTTM: string;
  SharesOutstanding: string;
}

export interface AVNewsResponse {
  feed: NewsArticle[];
}

export interface NewsArticle {
  title: string;
  url: string;
  summary: string;
  banner_image: string;
  source: string;
}
