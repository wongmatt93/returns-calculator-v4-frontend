import { FormEvent, useContext, useState } from "react";
import Stock from "../../../models/Stock";
import "./AddDividendForm.css";
import Modal from "react-modal";
import { getStockQuantity } from "../../../services/stockFunctions";
import AuthContext from "../../../context/AuthContext";

Modal.setAppElement("#root");

interface Props {
  stock: Stock;
}

const AddDividendForm = ({ stock }: Props) => {
  const { user, addDividend } = useContext(AuthContext);
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModal = (): void => setModalIsOpen(true);
  const closeModal = (): void => setModalIsOpen(false);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (getStockQuantity(stock)) {
      addDividend(user!.uid, stock.ticker, {
        amount: parseFloat(amount),
        date: date,
      });
      setModalIsOpen(false);
    } else {
      alert("You cannot add dividends if you don't own shares");
    }
  };

  return (
    <div className="AddDividendForm">
      <button onClick={openModal} disabled={!getStockQuantity(stock)}>
        Add Dividends
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="add-dividend-modal"
        overlayClassName="add-dividend-overlay"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="dividend-inputs">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="dividend-inputs">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button>Add Dividend</button>
        </form>
      </Modal>
    </div>
  );
};

export default AddDividendForm;
