import { useState } from "react";
import { formatMoney, formatPercent } from "../../services/formatFunctions";
import "./AnnualIncomeRow.css";

interface Props {
  year: string;
  total: number;
  prevTotal: number;
  quarterlies: { [key: string]: any };
}

const AnnualIncomeRow = ({ year, total, prevTotal, quarterlies }: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseOver = (): void => setIsHovering(true);
  const handleMouseOut = (): void => setIsHovering(false);

  return (
    <tr className="AnnualIncomeRow">
      <td onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {year}
      </td>
      <td>{formatMoney(total)}</td>
      <td>
        {prevTotal ? formatPercent((total - prevTotal) / prevTotal) : "N/A"}
      </td>

      {isHovering && (
        <td className="quarterly-row-cell">
          {Object.keys(quarterlies)
            .filter((quarter) => quarter.includes(year))
            .sort()
            .map((item, index) => (
              <tr key={index}>
                <td>{item.split("").splice(4).join("")}</td>
                <td>{formatMoney(quarterlies[item])}</td>
              </tr>
            ))}
        </td>
      )}

      {/* <ul>
        {Object.keys(quarterlies)
          .filter((quarter) => quarter.includes(year))
          .sort()
          .map((item, index) => (
            <li key={index}>
              {item.split("").splice(4).join("")}:{" "}
              {formatMoney(quarterlies[item])}
            </li>
          ))}
      </ul> */}
    </tr>
  );
};

export default AnnualIncomeRow;
