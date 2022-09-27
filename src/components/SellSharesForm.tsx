import { FormEvent, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Modal from "react-modal";
import "./SellSharesForm.css";
import Stock from "../models/Stock";
import {
  getCostBasis,
  getSharesCommittedToOptions,
  getStockQuantity,
} from "../services/stockFunctions";

interface Props {
  stock: Stock;
}

const SellSharesForm = ({ stock }: Props) => {
  const { user, sellShares } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [date, setDate] = useState<string>("");

  const openModal = (): void => setModalIsOpen(true);
  const closeModal = (): void => setModalIsOpen(false);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (quantity > getStockQuantity(stock)) {
      alert("You cannot sell more shares than you own");
    } else if (
      quantity >
      getStockQuantity(stock) - getSharesCommittedToOptions(stock)
    ) {
      alert(
        "You cannot sell some of these shares because they are committed to your open options positions"
      );
    } else {
      let profit: number = 0;
      const remainder: number =
        (quantity / getStockQuantity(stock)) * getCostBasis(stock);
      profit = cost - remainder;
      sellShares(user!.uid, stock.ticker, { quantity, cost, profit, date });
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
        overlayClassName="buy-shares-overlay"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="sell-shares-inputs">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="sell-shares-inputs">
            <label htmlFor="cost">Cost:</label>
            <input
              type="number"
              name="cost"
              id="cost"
              value={cost}
              onChange={(e) => setCost(parseInt(e.target.value))}
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
