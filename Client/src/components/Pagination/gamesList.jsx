import styles from "../Pagination/gameList.module.css"; 

import { useEffect, useState } from "react";
import { Pagination } from "./pagination";

export const GamesList = () => {
  const [games, setGames] = useState([]);
  const [gamesForPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

   const gameList = async () => {
    try {
      const data = await fetch(
        "https://api.rawg.io/api/games?key=95817a7e4a5b4f108f31cffdc2c8d8e1"
      );
      console.log(data);
      const gamesData = await data.json();
      setGames(gamesData.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    gameList();
  }, []);

  const indexOfLastGame = currentPage * gamesForPage;
  const indexOfFirstGame = indexOfLastGame - gamesForPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <>
      <div className={styles.conteiner} >
        {currentGames.map((game) => (
          <div className={styles.card} key={game.id}>
              <img src={game.background_image} alt={game.name} className={styles.image} />           
            <div className={styles.conteiner2}>
              <h2 className={styles.info}>{game.name}</h2>
              <p>Genres: {game.genres.map((genre) => genre.name).join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        gamesForPage={gamesForPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalGames={games.length}
      />
    </>
  );
};
