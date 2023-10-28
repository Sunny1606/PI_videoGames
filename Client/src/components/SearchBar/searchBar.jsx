import { useState } from "react";
import styles from "./SearchBar.module.css";

// eslint-disable-next-line react/prop-types
const SearchBar = ({onSearch}) => {

  let [aux, setAux] = useState('');
  let [id, setId] = useState ('');

   
  const handleChange = (event) => {
      setId(event.target.value);
    };

  function detector(id) {
    setAux(id)
    if(id !== aux) {
      onSearch(id)
    }

  }
  return (
    <div>
      <input className={styles.input}
      type="search" onChange={handleChange}
      value={id} />
      <button onClick={() => detector(id)} className={styles.search}>SEARCH</button>
    </div>
  );
}

export default SearchBar;