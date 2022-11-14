import BuyToOpen from "../../../models/BuyToOpen";
import OptionTableDisplay from "../../../models/OptionTableDisplay";
import SellToOpen from "../../../models/SellToOpen";
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
      <thead>
        <tr>
          <th>Type</th>
          <th>Option</th>
          <th>Quantity</th>
          <th>Close?</th>
        </tr>
      </thead>
      <tbody>
        {allOpenOptions.length &&
          optionsByQuantity.map((option, index) => (
            <OpenOptionRow option={option} key={index} />
          ))}
      </tbody>
    </table>
  );
};

export default OpenOptionsTable;
