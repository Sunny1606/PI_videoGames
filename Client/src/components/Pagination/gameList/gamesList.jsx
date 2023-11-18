import styles from "./gameList.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../pagination/pagination";
import { Link } from "react-router-dom";
import SearchBar from "../../SearchBar/searchBar";
import { searchVideogame } from "../../../redux/actions";
import axios from "axios";

export const GamesList = () => {
  const dispatch = useDispatch();

  //aca vienen todos los juegos por redux actions , se guardan en totalgames y despues la paginacion hace lo suyo
  const allGames = useSelector((state) => state.videogames);
  const [filteredGames, setFilteredGames] = useState(allGames);
  // const games = useSelector((state) => state.videogames);
  const totalGames = filteredGames ? filteredGames.length : 0;

 
  //aca se determina cuantos juegos por pagina , 1 pagina / 15juegos
  const [gamesForPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  //calculo matematico para multiplicar la cantidad de juegos obtenida y el numero de paginas
  const indexOfLastGame = currentPage * gamesForPage;
  const indexOfFirstGame = indexOfLastGame - gamesForPage;
  const currentGames = Array.isArray(filteredGames)
    ? filteredGames.slice(indexOfFirstGame, indexOfLastGame)
    : [];

  const handleSearch = async (searchTerm) => {
    try {
      const { data } = await axios.get(`http://localhost:3005/${searchTerm}`);
      
      dispatch(searchVideogame(data));
      setFilteredGames(data);
      setCurrentPage(1); // Restablecer la página actual a 1 después de cada búsqueda
    } catch (error) {
      console.log("Error al buscar");
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.conteiner}>
        <Pagination
          gamesForPage={gamesForPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalGames={totalGames}
        />
        {currentGames?.map((game) => (
          <div className={styles.card} key={game.id}>
            <div className={styles.imageBox}>
              <Link to={`/detail/${game.id}`}>
                <img
                  src={game.image}
                  alt={game.name}
                  className={styles.image}
                />
              </Link>
            </div>
            <div className={styles.conteiner2}>
              <h2>{game.name}</h2>
              <p>{game.genres.map((genre) => genre).join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        gamesForPage={gamesForPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalGames={totalGames}
      />
    </>
  );
};

//
