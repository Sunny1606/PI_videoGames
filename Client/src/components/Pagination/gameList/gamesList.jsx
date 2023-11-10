import styles from "./gameList.module.css"; 
import { useEffect, useState } from "react";
import { useSelector , useDispatch } from "react-redux" ; 
import { Pagination } from "../pagination/pagination";
import { getGames } from "../../../redux/actions";

export const GamesList = () => {

  const dispatch = useDispatch();   

  const games = useSelector((state) => state.videogames);

 

  const totalGames = games?.length;   //aca se va a guardar todos los games de la api cantidad
  const [gamesForPage] = useState(15);    //cuantos games quiero por pagina 
  const [currentPage, setCurrentPage] = useState(1);   //para pagina actual que inicia en 1 siempre


  useEffect(() => {
    dispatch(getGames());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 

  const indexOfLastGame = currentPage * gamesForPage;
  const indexOfFirstGame = indexOfLastGame - gamesForPage;
  const currentGames = games?.slice(indexOfFirstGame, indexOfLastGame);

  
  return (
    <>
      <div className={styles.conteiner} >
      <Pagination 
        gamesForPage={gamesForPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalGames={totalGames}
      />
        {currentGames?.map((game) => (
          
          <div className={styles.card} key={game.id}>
            <div className={styles.imageBox}>
              
              <img src={game.image} alt={game.name} className={styles.image} />           
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
