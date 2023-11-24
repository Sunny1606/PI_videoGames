import {  useState } from "react";
import style from "./searchBar.module.css";
import { searchVideogame } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const SearchBar = () => {
  const games = useSelector((state) => state.videogamesAux); //estos son todos mis juegos traidos
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
    if(event.target.value !== "") {
      handleSearch(event.target.value);
    }
    else {
      dispatch(searchVideogame(games))
    }
  };

  const handleSearch = (value) => {
    const found = games.filter((videogames) =>
      videogames.name.toLowerCase().includes(value.toLowerCase())
    );
    dispatch(searchVideogame(found));
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

export default SearchBar;

