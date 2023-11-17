import styles from "./gameList.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Pagination } from "../pagination/pagination";
import { Link } from "react-router-dom";
import SearchBar from "../../SearchBar/searchBar"
// import axios from "axios";


export const GamesList = () => {

  const games = useSelector((state) => state.videogames); //estos son todos mis juegos traidos
  const totalGames = games ? games.length : 0; //aca se va a guardar la cantida de juegos traidos

  const allGames = useSelector((state) => state.videogames);
  // eslint-disable-next-line no-unused-vars
  const [filteredGames, setFilteredGames] = useState(allGames);
  

  
  const [gamesForPage] = useState(15); //cuantos games quiero por pagina
  const [currentPage, setCurrentPage] = useState(1); //para pagina actual que inicia en 1 siempre

  const indexOfLastGame = currentPage * gamesForPage;
  const indexOfFirstGame = indexOfLastGame - gamesForPage;
  const currentGames = Array.isArray(games) ? games.slice(indexOfFirstGame, indexOfLastGame) : [];




  return (
    <>
         <SearchBar  />
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
