import { useState } from "react";
import styles from "./searchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <input
        className={styles.input}
        type="search"
        onChange={handleChange}
        value={name}
      />
      <button
        onClick={() => {
          if (name !== aux) {
            onSearch(name);
          }
        }}
        className={styles.search}
      >
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
