import { FormEvent, useState } from "react";
import "./SearchStockForm.css";

interface Props {
  setTicker: (string: string) => void;
}

const SearchStockForm = ({ setTicker }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setTicker(searchTerm);
  };

  return (
    <form className="SearchStockForm" onSubmit={handleSubmit}>
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        name="search"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
      />
      <button>Go</button>
    </form>
  );
};

export default SearchStockForm;
