import OptionTableDisplay from "../models/OptionTableDisplay";
import { formatMoney } from "../services/formatFunctions";
import "./OpenOptionRow.css";

interface Props {
  option: OptionTableDisplay;
}

const OpenOptionRow = ({ option }: Props) => {
  return (
    <tr className="OpenOptionRow">
      <td>{option.type}</td>
      <td>{`${option.expirationDate} ${formatMoney(option.strike)} ${
        option.callPut
      }`}</td>
      <td>{option.quantity}</td>
      <td>Open</td>
    </tr>
  );
};

export default OpenOptionRow;
