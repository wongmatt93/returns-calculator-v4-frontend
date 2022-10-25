import { formatMoney } from "../services/formatFunctions";
import "./YearlyTotals.css";

interface Props {
  year: string;
  total: string;
  quarterlies: { [key: string]: any };
}

const YearlyTotals = ({ year, total, quarterlies }: Props) => {
  return (
    <li className="YearlyTotals">
      <h3>
        {year}: {total}
      </h3>
      <ul>
        {Object.keys(quarterlies)
          .filter((quarter) => quarter.includes(year))
          .sort()
          .map((item, index) => (
            <li key={index}>
              {item}: {formatMoney(quarterlies[item])}
            </li>
          ))}
      </ul>
    </li>
  );
};

export default YearlyTotals;
