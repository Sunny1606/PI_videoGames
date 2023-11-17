import { useState } from "react";
import style from "./searchBar.module.css";
import { useDispatch } from "react-redux";
import axios from "axios";
// import { getByName } from "../../redux/actions";
import { searchVideogame } from "../../redux/actions";

const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
    search.length && handleSearch();
  };

  // useEffect(() => {
  //   handleSearch();
  // }, []); // Ejecutar la búsqueda cuando 'search' cambie para evitar desfasaje

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3005/${search}`);

      dispatch(searchVideogame(data));
    } catch (error) {
      console.log("Error al buscar");
    }
  };

  return (
    <div className={style.search}>
      <input
        className={style.input}
        type="text"
        placeholder="Search a game here..."
        value={search}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
