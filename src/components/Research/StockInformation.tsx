import { useEffect, useState } from "react";
import AlphaVantageResponse, { NewsArticle } from "../../models/AlphaVantage";
import { getStockInfo, getStockNews } from "../../services/alphaVantageService";
import { formatMoney, formatPercent } from "../../services/formatFunctions";
import NewsContainer from "./NewsContainer";
import StockDetailsList from "./StockDetailsList";
import "./StockInformation.css";

interface Props {
  ticker: string;
}

const StockInformation = ({ ticker }: Props) => {
  const [stockInfo, setStockInfo] = useState<AlphaVantageResponse | null>(null);
  const [stockNews, setStockNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    if (ticker) {
      getStockInfo(ticker).then((response) => {
        if (Object.keys(response).length) {
          setStockInfo(response);
          getStockNews(ticker).then((response) =>
            setStockNews(response.feed.slice(0, 8))
          );
        }
      });
    }
  }, [ticker]);

  return (
    <div className="StockInformation">
      {stockInfo ? (
        <>
          <h2>{stockInfo.Name}</h2>
          <div className="upper-section">
            <section className="stock-price-section">
              <h3>Previous Close</h3>
              <p>{ticker}</p>
              <p className="stock-price">
                {formatMoney(
                  parseFloat(stockInfo.MarketCapitalization) /
                    parseFloat(stockInfo.SharesOutstanding)
                )}
              </p>
            </section>
            <section className="dividend-section">
              <h3>Dividend Info</h3>
              <div className="dividend-info">
                <div>
                  <p>Dividend Per Share</p>
                  <p className="dividend-per-share">
                    {formatMoney(parseFloat(stockInfo.DividendPerShare) / 4)}
                  </p>
                </div>
                <div>
                  <p>Dividend Yield</p>
                  <p className="dividend-yield">
                    {formatPercent(parseFloat(stockInfo.DividendYield))}
                  </p>
                </div>
                <div>
                  <p>Dividend Date</p>
                  <p className="dividend-date">{stockInfo.DividendDate}</p>
                </div>
              </div>
            </section>
          </div>
          <div className="lower-section">
            <div className="lower-left">
              <section className="description-section">
                <h3>Description</h3>
                <p>{stockInfo.Description}</p>
              </section>
              <NewsContainer stockNews={stockNews} />
            </div>
            <StockDetailsList stockInfo={stockInfo} />
          </div>
        </>
      ) : (
        <h2>Search for Stocks</h2>
      )}
    </div>
  );
};

export default StockInformation;
