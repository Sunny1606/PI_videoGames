import { useDispatch } from "react-redux";
import styles from "./searchBar.module.css";
import { useState } from "react";
import { getByName } from "../../redux/actions";

// eslint-disable-next-line react/prop-types
export default function SearchBar({setCurrentPage}) {

  const dispatch = useDispatch();
  const [name, setName] = useState("");  


  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(name));
    setCurrentPage(1);
    setName("");
  }

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search here..."
        onChange={handleInputChange}
        value={name}
      />
     <button
          className={styles.searchButton}
          id="bt"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          SEARCH
        </button>
    </div>
  );
}
