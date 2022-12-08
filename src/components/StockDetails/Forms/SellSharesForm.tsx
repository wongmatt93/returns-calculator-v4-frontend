import { FormEvent, useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import Modal from "react-modal";
import "./SellSharesForm.css";
import Stock from "../../../models/Stock";
import {
  getStockCostBasis,
  getSharesCommittedToOptions,
  getStockQuantity,
} from "../../../services/stockFunctions";

interface Props {
  stock: Stock;
}

const SellSharesForm = ({ stock }: Props) => {
  const { user, sellShares } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const openModal = (): void => setModalIsOpen(true);
  const closeModal = (): void => setModalIsOpen(false);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (parseFloat(quantity) > getStockQuantity(stock)) {
      alert("You cannot sell more shares than you own");
    } else if (
      parseFloat(quantity) >
      getStockQuantity(stock) - getSharesCommittedToOptions(stock)
    ) {
      alert(
        "You cannot sell some of these shares because they are committed to your open options positions"
      );
    } else {
      let profit: number = 0;
      const remainder: number =
        (parseFloat(quantity) / getStockQuantity(stock)) *
        getStockCostBasis(stock);
      profit = parseFloat(cost) - remainder;
      sellShares(user!.uid, stock.ticker, {
        quantity: parseFloat(quantity),
        cost: parseFloat(cost),
        profit,
        date,
      });
      setModalIsOpen(false);
    }
  };
  return (
    <div className="SellSharesForm">
      <button
        onClick={openModal}
        disabled={
          !(getStockQuantity(stock) - getSharesCommittedToOptions(stock))
        }
      >
        Sell Shares
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="sell-shares-modal"
        overlayClassName="sell-shares-overlay"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="sell-shares-inputs">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="sell-shares-inputs">
            <label htmlFor="cost">Cost:</label>
            <input
              type="number"
              name="cost"
              id="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
          <div className="sell-shares-inputs">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button>Sell Shares</button>
        </form>
      </Modal>
    </div>
  );
};

export default SellSharesForm;
