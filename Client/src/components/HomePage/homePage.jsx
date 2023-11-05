import styles from "./home.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getGames,
  orderByName,
  orderByRating,
  filterCreated,
  filterByGenres,
} from "../../redux/actions";
import { useEffect, useState } from "react";
import Card from "../Card/card";
import SearchBar from "../SearchBar/searchBar";
import Pagination from "../Pagination/pagination"; 

const Home = () => {
  const dispatch = useDispatch();

  const fullgames = useSelector((state) => state.videogames);   //PROBAR SINO VIDEOGAMES
  // eslint-disable-next-line no-unused-vars
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage; //15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; // 0

  const currentGames = fullgames.slice(indexOfFirstGame, indexOfLastGame);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Carga los datos de Games al montar el componente
  useEffect(() => {
    dispatch(getGames());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function handleClick(e) {
  //   e.preventDefault();
  //   dispatch(getGames());
  // }

  function handleName(e) {
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  const handleFilterByGenres = (e) => {
    dispatch(filterByGenres(e.target.value));
  };

  function handleFilterCreated(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterCreated(e.target.value));
  }
  function handleRating(e) {
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div>
      <Pagination
        gamesPerPage={gamesPerPage}
        fullGames={fullgames.length}
        paginado={handlePagination}
      />
      <div className={styles.SearchBar}>
        <SearchBar setCurrentPage={setCurrentPage} />
      </div>
      <div className={styles.image}></div>
      <div>
        <select className={styles.select} onChange={handleName}>
          <option>Order by Name</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
        <select className={styles.select} onChange={handleRating}>
          <option>Order by Ranking</option>
          <option>Ascendente</option>
          <option>Descendente</option>
        </select>

        <select
          className={styles.genresConteiner}
          onChange={handleFilterByGenres}
        >
          <option>Genres</option>
          <option value="Action">Action</option>
          <option value="Indie">Indie</option>
          <option value="Strategy">Strategy</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
          <option value="Shooter">Shooter</option>
          <option value="Casual">Casual</option>
          <option value="Simulation">Simulation</option>
          <option value="Arcade">Arcade</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Platformer">Platformer</option>
          <option value="Racing">Racing</option>
          <option value="Massively Multiplayer">Massively Multiplayer</option>
          <option value="Fighting">Fighting</option>
          <option value="Sports">Sports</option>
          <option value="Family">Family</option>
          <option value="Board Games">Board Games</option>
          <option value="Educational">Educational</option>
          <option value="Card">Card</option>
        </select>
        <select
          className={styles.SourceConteiner}
          onChange={handleFilterCreated}
        >
          <option>Source</option>
          <option>All</option>
          <option>Created</option>
          <option>ApiGames</option>
        </select>
        <button>CREATE GAME</button>

        <div className={styles.card}>
          {currentGames.length === 0 ? (
            <div></div>
          ) : (
            currentGames.map((card) => {
              return (
                <div key={card.id}>
                  <Card
                    key={card.id}
                    id={card.id}
                    name={card.name}
                    image={card.image}
                    rating={card.rating}
                    genres={
                      !currentGames[0].createdInDb
                        ? card.genres
                        : currentGames[0].genres.join(" - ")
                    }
                  />
                </div>
              );
            })
          )}
        </div>
        <Pagination
          gamesPerPage={gamesPerPage}
          fullGames={fullgames.length}
          paginado={Pagination}
        />
      </div>
    </div>
  );
};

export default Home;
