import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./home.module.css";   

import {
  getGames,
  orderByName,
  orderByRating,
  filterCreated,
  filterByGenres,
} from "../../redux/actions";

import Card from "../Card/card";
import Pagination from "../Pagination/pagination";
import SearchBar from "../SearchBar/searchBar";
import { Link } from "react-router-dom";
import PATHROUTES from "../Helpers/pathRoutes";

export default function Home() {
  const dispatch = useDispatch();

  const fullGames = useSelector((state) => state.videogames);
  // eslint-disable-next-line no-unused-vars
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage; //15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; // 0

  const currentGames = fullGames.slice(indexOfFirstGame, indexOfLastGame);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);


  function handleFilterGenres(e) {
    setCurrentPage(1);
    dispatch(filterByGenres(e.target.value));
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterCreated(e.target.value));
  }

  function handleSortName(e) {
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleSortRating(e) {
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div>
      <div>
          <SearchBar setCurrentPage={setCurrentPage} />
      </div>
      <div>
      
        <div className={styles.Allselect}>
          <select className={styles.Order}
            onChange={(e) => {
              handleSortName(e);
            }}
          >
            <option >
              Order
            </option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>

          <select className={styles.Rating}
            onChange={(e) => {
              handleSortRating(e);
            }}
          >
            <option >
              Rating
            </option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>

          <select className={styles.Created}
            onChange={(e) => handleFilterCreated(e)}
          >
            <option >
              Created
            </option>
            <option value="All">All</option>
            <option value="created">Created</option>
            <option value="api">Apigames</option>
          </select>

          <select className={styles.Genres}
            onChange={handleFilterGenres}
          >
            <option >
              Genres
            </option>
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
          <button className={styles.btnCreated}>
          <Link className={styles.links} to={PATHROUTES.FORM}>Form</Link>
          </button>
        </div>

        <Pagination
          gamesPerPage={gamesPerPage}
          fullGames={fullGames.length}
          paginado={handlePagination}
        />

        <div className={styles.Card}>
          {currentGames.length === 0 ? (
            <div>
              <img src="" alt="Loading..." className={styles.loading} />
            </div>
          ) : (
            currentGames.map((el) => {
              return (
                <div key={el.id}>
                  <Card
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    image={el.image}
                    rating={el.rating}
                    genres={
                      !currentGames[0].createdInDb
                        ? el.genres
                        : currentGames[0].genres.join(" - ")
                    }
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
