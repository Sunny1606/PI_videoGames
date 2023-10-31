import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "./components/Pagination/pagination";
// import styles from "../Pagination/pagination.module.css";

export const gamesList = () => {
  const [games, setGames] = useState([]);
  const [gamesForPage, setGamesForPage] = useState(15); //en donde limita
  const [currentPage, setCurrentPage] = useState(1); // dsde donde arranca

  const gameList = async () => {
    const data = await axios.get(
      "https://api.rawg.io/api/games?key=95817a7e4a5b4f108f31cffdc2c8d8e1"
    );
    const games = await data.json();
    setGames(games);
  };

  useEffect(() => {
    gameList();
  }, []);

  return (
    <>
    <div className="conteiner-games">
      {games.map((game) => (
        <div className="card-games" key={game.id}>
          <figure className="conteiner-img">
            <img src={game.background_image} alt={game.name} />
          </figure>
          <div className="game-info">
            <h2>{game.name}</h2>
            <p>Genres: {game.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
      ))}
    </div>
      <Pagination />
      </>
  );
};
