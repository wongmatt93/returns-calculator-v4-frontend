import AlphaVantageResponse from "../../models/AlphaVantageResponse";
import { formatMoney, formatPercent } from "../../services/formatFunctions";
import "./StockDetailsList.css";

interface Props {
  stockInfo: AlphaVantageResponse;
}

const StockDetailsList = ({ stockInfo }: Props) => {
  return (
    <section className="StockDetailsList">
      <h3>Details</h3>
      <ul>
        <li>
          <p>52 Week Range</p>
          <p>
            {formatMoney(parseFloat(stockInfo["52WeekLow"]))} -{" "}
            {formatMoney(parseFloat(stockInfo["52WeekHigh"]))}
          </p>
        </li>
        <li>
          <p>Gross Profit TTM</p>
          <p>{formatMoney(parseFloat(stockInfo.GrossProfitTTM))}</p>
        </li>
        <li>
          <p>Market Cap</p>
          <p>{formatMoney(parseFloat(stockInfo.MarketCapitalization))}</p>
        </li>
        <li>
          <p>Profit / Market Cap</p>
          <p>
            {formatPercent(
              parseFloat(stockInfo.GrossProfitTTM) /
                parseFloat(stockInfo.MarketCapitalization)
            )}
          </p>
        </li>
        <li>
          <p>Earnings Growth YOY</p>
          <p>
            {formatPercent(parseFloat(stockInfo.QuarterlyEarningsGrowthYOY))}
          </p>
        </li>
        <li>
          <p>PE Ratio</p>
          <p>{stockInfo.PERatio}</p>
        </li>
        <li>
          <p>EPS</p>
          <p>${stockInfo.EPS}</p>
        </li>
        <li>
          <p>Beta</p>
          <p>{stockInfo.Beta}</p>
        </li>
        <li>
          <p>Outstanding Shares</p>
          <p>
            {stockInfo.SharesOutstanding.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </li>
      </ul>
    </section>
  );
};

export default StockDetailsList;
