import styles from "./home.module.css";
import { connect, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GamesList } from "../Pagination/gameList/gamesList";
import PATHROUTES from "../Helpers/pathRoutes";
import {Link} from "react-router-dom";   
import SearchBar from "../SearchBar/searchBar"

import {
  getGames,
  orderByName,
  orderByRating,
  filterCreated,
  filterByGenres,
} from "../../redux/actions";

// eslint-disable-next-line react-refresh/only-export-components
const Home = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [order, setOrder] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    dispatch(getGames());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  function handleSortName(e) {
    dispatch(orderByName(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1);

  }

  function handleSortRating(e) {
    dispatch(orderByRating(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);

  }

  function handleFilterGenres(e) {
    dispatch(filterByGenres(e.target.value));
    setCurrentPage(1);

  }

  return (
    <div>
         <div>
         <SearchBar setCurrentPage={setCurrentPage} />
         </div>

      <div className={styles.AllSelect} >
        <select
          className={styles.All}
          onChange={(e) => {
            handleSortName(e);
          }}
        >
          <option>Order</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <select
          className={styles.All}
          onChange={(e) => {
            handleSortRating(e);
          }}
        >
          <option>Rating</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        <select
          className={styles.All}
          onChange={(e) => handleFilterCreated(e)}
        >
          <option>Created</option>
          <option value="All">All</option>
          <option value="created">Created</option>
          <option value="api">Apigames</option>
        </select>

        <select className={styles.All} onChange={handleFilterGenres}>
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
        </select>

        <button className={styles.btnCreated}>
          <Link className={styles.links} to={PATHROUTES.FORM}>Create Game</Link>
          </button>

        <GamesList />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    videogames: state.videogames,
  };
};



// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, null)(Home);
