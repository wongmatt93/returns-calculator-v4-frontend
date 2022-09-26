import "./BuySharesForm.css";
import Modal from "react-modal";
import { FormEvent, useContext, useState } from "react";
import { buyShares } from "../services/userProfileService";
import AuthContext from "../context/AuthContext";

Modal.setAppElement("#root");

interface Props {
  ticker: string;
}

const BuySharesForm = ({ ticker }: Props) => {
  const { user } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [date, setDate] = useState<string>("");

  const openModal = (): void => setModalIsOpen(true);
  const closeModal = (): void => setModalIsOpen(false);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    buyShares(user!.uid, ticker, { quantity, cost, date });
    setModalIsOpen(false);
  };

  return (
    <div className="BuySharesForm">
      <button onClick={openModal}>Buy Shares</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="buy-shares-modal"
        overlayClassName="buy-shares-overlay"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="buy-shares-inputs">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="buy-shares-inputs">
            <label htmlFor="cost">Cost:</label>
            <input
              type="number"
              name="cost"
              id="cost"
              value={cost}
              onChange={(e) => setCost(parseInt(e.target.value))}
            />
          </div>
          <div className="buy-shares-inputs">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button>Buy Shares</button>
        </form>
      </Modal>
    </div>
  );
};

export default BuySharesForm;