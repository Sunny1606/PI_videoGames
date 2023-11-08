import { useEffect, useState } from "react";
import styles from "./gameList.module.css";

export const GameList = () => {
  const [games, setGames] = useState([]);
  const [gamesPrePage, setGamesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const GameList = async () => {
    const data = await fetch("https://api.rawg.io/api/games");
    const games = await data.json();

    console.log(games);
  };
  setGames(games);

  useEffect(() => {
    GameList();
  }, []);

  return (
    <>
        <div>
            {games.map(games => (

                <div>
                <figure>
                    <img src={games.image} alt={games.title} />        
                </figure>
                <div>
                <h3>{games.title}</h3>
                
                </div>
                    <button></button>
                
                </div>

            ))}
    
    
    
    
    
        </div>
    
        <Pagination/>
    
    
    
    
    
    
    </>




  ) ;
};
