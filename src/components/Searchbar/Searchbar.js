import { toast } from "react-toastify";
import { useState } from "react";

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const onInputChange = (e) => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.error("the field must not be empty!");
      return;
    }
    onSubmit(query);

    setQuery("");
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onInputChange}
        />
      </form>
    </header>
  );
};
export default Searchbar;
