import { FormEvent, useContext, useState } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import BuyToClose from "../models/BuyToClose";
import BuyToOpen from "../models/BuyToOpen";
import OptionTableDisplay from "../models/OptionTableDisplay";
import SellToClose from "../models/SellToClose";
import SellToOpen from "../models/SellToOpen";
import Stock from "../models/Stock";
import "./AddCloseOptionsForm.css";

Modal.setAppElement("#root");

interface Props {
  optionDisplay: OptionTableDisplay;
}

const AddCloseOptionsForm = ({ optionDisplay }: Props) => {
  const { user, currentUserProfile, addBTC, addSTC } = useContext(AuthContext);
  const ticker: string | undefined = useParams().ticker;
  const [quantity, setQuantity] = useState(0);
  const [premium, setPremium] = useState<string>("");
  const [date, setDate] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModal = (): void => setModalIsOpen(true);
  const closeModal = (): void => setModalIsOpen(false);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (!optionDisplay.quantity) {
      alert("No positions to close");
    } else if (quantity > optionDisplay.quantity) {
      alert("You cannot close more positions than are currently open");
    } else {
      const newOption: SellToClose | BuyToClose = {
        transactionDate: date,
        callPut: optionDisplay.callPut,
        type: optionDisplay.type === "STO" ? "BTC" : "STC",
        strike: optionDisplay.strike,
        expirationDate: optionDisplay.expirationDate,
        premium: parseFloat(premium),
      };
      if (newOption.type === "BTC") {
        for (let i: number = 0; i < quantity; i++) {
          const stock: Stock | undefined = currentUserProfile!.stocks.find(
            (stock) => stock.ticker === ticker
          );
          const openOption: SellToOpen | undefined =
            stock?.sellToOpenOptions.filter(
              (option) =>
                option.callPut === newOption.callPut &&
                option.expirationDate === newOption.expirationDate &&
                option.strike === newOption.strike &&
                option.open
            )[i];
          const index: number = stock!.sellToOpenOptions.indexOf(openOption!);
          addBTC(user!.uid, ticker!, newOption, index);
        }
      } else {
        for (let i: number = 0; i < quantity; i++) {
          const stock: Stock | undefined = currentUserProfile!.stocks.find(
            (stock) => stock.ticker === ticker
          );
          const openOption: BuyToOpen | undefined =
            stock?.buyToOpenOptions.filter(
              (option) =>
                option.callPut === newOption.callPut &&
                option.expirationDate === newOption.expirationDate &&
                option.strike === newOption.strike &&
                option.open
            )[i];
          const index: number = stock!.buyToOpenOptions.indexOf(openOption!);
          addSTC(user!.uid, ticker!, newOption, index);
        }
      }
      setModalIsOpen(false);
    }
  };

  return (
    <div className="AddCloseOptionsForm">
      <button onClick={openModal}>Close Positions</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="add-close-options-modal"
        overlayClassName="add-close-options-overlay"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="add-close-options-inputs">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="add-close-options-inputs">
            <label htmlFor="premium">Premium</label>
            <input
              type="text"
              name="premium"
              id="premium"
              value={premium}
              onChange={(e) => setPremium(e.target.value)}
            />
          </div>
          <div className="add-close-options-inputs">
            <label htmlFor="date">Transaction Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button>Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default AddCloseOptionsForm;
