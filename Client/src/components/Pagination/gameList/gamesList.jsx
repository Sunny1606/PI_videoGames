import styles from "./gameList.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "../pagination/pagination";
import { getGames } from "../../../redux/actions";
import { Link } from "react-router-dom";
import PATHROUTES from "../../Helpers/pathRoutes";

export const GamesList = () => {
  const dispatch = useDispatch();

  const games = useSelector((state) => state.videogames); //estos son todos mis juegos traidos

  const totalGames = games?.length; //aca se va a guardar la cantida de juegos traidos
  const [gamesForPage] = useState(15); //cuantos games quiero por pagina
  const [currentPage, setCurrentPage] = useState(1); //para pagina actual que inicia en 1 siempre

  useEffect(() => {
    dispatch(getGames());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const indexOfLastGame = currentPage * gamesForPage;
  const indexOfFirstGame = indexOfLastGame - gamesForPage;
  const currentGames = games?.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <>
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
              <Link to={PATHROUTES.DETAIL}>
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
