import styles from "./searchBar.module.css";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function SearchBar({ onSearch }) {

  let [aux, setAux] = useState('');
  const [name, setName] = useState("");    // Cambiamos 'id' a 'name'


  const handleChange = (event) => {
    setName(event.target.value);
  };

  function handleSearch(name)  {
    setAux(name)
    if (name !== aux) {
      onSearch(name); // Llama a la función de búsqueda con el nombre
    }
  }

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search here..."
        onChange={handleChange}
        value={name}
      />
      <button onClick={() => handleSearch(name)} className={styles.search}>
        SEARCH
      </button>
    </div>
  );
}
