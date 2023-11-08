import { useDispatch } from "react-redux";
import styles from "./searchBar.module.css";
import { useState } from "react";
<<<<<<< HEAD
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
=======
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions";

// eslint-disable-next-line react/prop-types
export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(name));
    setCurrentPage(1);
    setName("");
  }

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  return (
    
      <div className={styles.search}>
        <input
          className={styles.input}
          id="in"
          type="text"
          placeholder="Search here..."
          value={name}
          onChange={(e) => handleInputChange(e)}
        />
        <button
>>>>>>> 0c22b022bb39acc5e7ea7f768c7e2de90619afb7
          className={styles.searchButton}
          id="bt"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          SEARCH
        </button>
<<<<<<< HEAD
    </div>
=======
      </div>
    
>>>>>>> 0c22b022bb39acc5e7ea7f768c7e2de90619afb7
  );
}
