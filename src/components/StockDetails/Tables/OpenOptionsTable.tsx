import OptionTableDisplay from "../../../models/OptionTableDisplay";
import { BuyToOpen, SellToOpen } from "../../../models/Stock";
import OpenOptionRow from "./OpenOptionRow";
import "./OpenOptionsTable.css";

interface Props {
  openBTO: BuyToOpen[];
  openSTO: SellToOpen[];
}

const OpenOptionsTable = ({ openBTO, openSTO }: Props) => {
  const res: { [key: string]: any } = {};
  const allOpenOptions: BuyToOpen[] | SellToOpen[] = openBTO
    .concat(openSTO)
    .filter((option) => option.open);
  allOpenOptions.forEach((option) => {
    const key = `${option["type"]}${option["callPut"]}${option["strike"]}${option["expirationDate"]}${option["open"]}`;
    if (!res[key]) {
      res[key] = {
        callPut: option.callPut,
        type: option.type,
        strike: option.strike,
        expirationDate: option.expirationDate,
        quantity: 0,
      };
    }
    res[key].quantity += 1;
  });

  const optionsByQuantity: OptionTableDisplay[] = Object.values(res);

  return (
    <table className="OpenOptionsTable">
      <caption>Open Options Positions</caption>
      <thead>
        <tr>
          <th className="type-cell">Type</th>
          <th className="description-cell">Option</th>
          <th className="quantity-cell">Quantity</th>
          <th className="close-cell">Close?</th>
        </tr>
      </thead>
      <tbody>
        {allOpenOptions.length > 0 ? (
          optionsByQuantity.map((option, index) => (
            <OpenOptionRow option={option} key={index} />
          ))
        ) : (
          <tr>
            <td colSpan={4}>No Open Options</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OpenOptionsTable;
