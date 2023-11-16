import { useState, useEffect } from "react";
// import style from "./searchBar.module.css";
import { useDispatch  } from "react-redux";
import axios from "axios";
// import { getByName } from "../../redux/actions";
import  {searchVideogame} from "../../redux/actions";



const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);

console.log(dataSearch);

  const handleChange = (event) => {
    setSearch(event.target.value);
    search.length ? handleSearch() : setDataSearch([]);
  };

  useEffect(() => {
    handleSearch();
  }, []); // Ejecutar la búsqueda cuando 'search' cambie para evitar desfasaje

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3005/name?name=${search}`
        );
        
        console.log(data);
     

      setDataSearch(data);
      dispatch(searchVideogame(dataSearch));
    } catch (error) {
      console.log("Error al buscar");
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          className="searchInput"
          type="text"
          placeholder="Busca tu Videogame"
          value={search}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Search;