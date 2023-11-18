import { useState } from "react";
import style from "./searchBar.module.css";

// eslint-disable-next-line react/prop-types
const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
    search.length && onSearch(search);
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

// const Search = () => {
//   const dispatch = useDispatch();
//   const [search, setSearch] = useState("");

//   const handleChange = (event) => {
//     setSearch(event.target.value);
//     search.length && handleSearch();
//   };

//   // const handleSearch = async () => {
//   //   try {
//   //     const { data } = await axios.get(`http://localhost:3005/${search}`);

//   //     dispatch(searchVideogame(data));
//   //   } catch (error) {
//   //     console.log("Error al buscar");
//   //   }
//   // };  const handleSearch = async () => {

//   const handleSearch = async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:3005/${search}`);
//       dispatch(searchVideogame(data));

//       // Actualizar el estado filteredGames con los resultados de la búsqueda
//       setFilteredGames(data);
//     } catch (error) {
//       console.log("Error al buscar");
//     }
//   };

//   return (
//     <div className={style.search}>
//       <input
//         className={style.input}
//         type="text"
//         placeholder="Search a game here..."
//         value={search}
//         onChange={handleChange}
//       />
//     </div>
//   );
// };

// export default Search;
