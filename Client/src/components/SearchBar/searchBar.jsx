import { useState, useEffect } from "react";
import style from "./searchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getByName } from "../../redux/actions";

//  busco en el estado general

const SearchBar = () => {
  const games = useSelector((state) => state?.videogames);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");


  const handleChange = (event) => {
    setSearch(event.target.value);
    handleSearch();
  };

  useEffect(() => {
    handleSearch();
  }, []); // Ejecutar la búsqueda cuando 'search' cambie para evitar desfasaje

  const handleSearch = () => {
    const found = games.filter((videogames) =>
      videogames?.name.toLowerCase().includes(search.toLowerCase())
    );

    dispatch(getByName(found));
  };

  return (
    <div className={style.search}>
      <div>
        <input
          className={style.input}
          type="text"
          placeholder="Search here..."
          value={search}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
