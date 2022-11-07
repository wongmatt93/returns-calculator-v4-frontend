import React, { FormEvent } from "react";
import { useContext, useState } from "react";
import Modal from "react-modal";
import AuthContext from "../../context/AuthContext";
import Stock from "../../models/Stock";
import {
  getSharesCommittedToOptions,
  getStockQuantity,
} from "../../services/stockFunctions";
import "./AddOpenOptionsForm.css";

Modal.setAppElement("#root");

interface Props {
  stock: Stock;
}

const AddOpenOptionsForm = ({ stock }: Props) => {
  const { user, addBTO, addSTO } = useContext(AuthContext);
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<string>("BTO");
  const [callPut, setCallPut] = useState<string>("C");
  const [strike, setStrike] = useState<string>("");
  const [premium, setPremium] = useState<string>("");
  const [expiration, setExpiration] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalIsOpen(true);
  const closeModal = (): void => setModalIsOpen(false);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const stockQuantity = getStockQuantity(stock);
    if (type === "BTO") {
      if (
        quantity * 100 > stockQuantity - getSharesCommittedToOptions(stock) &&
        callPut === "P"
      ) {
        alert("You don't have enough shares");
      } else {
        for (let i = 0; i < quantity; i++) {
          addBTO(user!.uid, stock.ticker, {
            type,
            transactionDate: date,
            callPut,
            strike: parseFloat(strike),
            expirationDate: expiration,
            premium: parseFloat(premium),
            open: true,
          });
        }
      }
    } else {
      if (
        quantity * 100 > stockQuantity - getSharesCommittedToOptions(stock) &&
        callPut === "C"
      ) {
        alert("You don't have enough shares");
      } else {
        for (let i = 0; i < quantity; i++) {
          addSTO(user!.uid, stock.ticker, {
            type,
            transactionDate: date,
            callPut,
            strike: parseFloat(strike),
            expirationDate: expiration,
            premium: parseFloat(premium),
            open: true,
          });
        }
      }
    }
    setModalIsOpen(false);
  };

  return (
    <div className="AddOpenOptionsForm">
      <button onClick={openModal}>Open Options</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="add-open-options-modal"
        overlayClassName="add-open-options-overlay"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="add-open-options-inputs">
            <label htmlFor="date">Transaction Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="add-open-options-inputs">
            <label htmlFor="type">Transaction Type</label>
            <select
              name="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="BTO">Buy To Open</option>
              <option value="STO">Sell To Open</option>
            </select>
          </div>
          <div className="add-open-options-inputs">
            <label htmlFor="callPut">Call/Put</label>
            <select
              name="callPut"
              id="callPut"
              value={callPut}
              onChange={(e) => setCallPut(e.target.value)}
            >
              <option value="C">Call</option>
              <option value="P">Put</option>
            </select>
          </div>
          <div className="add-open-options-inputs">
            <label htmlFor="strike">Strike Price</label>
            <input
              type="number"
              name="strike"
              id="strike"
              value={strike}
              onChange={(e) => setStrike(e.target.value)}
            />
          </div>
          <div className="add-open-options-inputs">
            <label htmlFor="expiration">Expiration Date</label>
            <input
              type="date"
              name="expiration"
              id="expiration"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
            />
          </div>
          <div className="add-open-options-inputs">
            <label htmlFor="premium">Premium</label>
            <input
              type="text"
              name="premium"
              id="premium"
              value={premium}
              onChange={(e) => setPremium(e.target.value)}
            />
          </div>
          <div className="add-open-options-inputs">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <button>Add Option</button>
        </form>
      </Modal>
    </div>
  );
};

export default AddOpenOptionsForm;
