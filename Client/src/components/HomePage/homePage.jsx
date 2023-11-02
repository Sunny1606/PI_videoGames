import styles from "./home.module.css";
import { connect, useSelector, useDispatch } from "react-redux";
import { filterGenres, filterSource, orderAZ } from "../../redux/actions";
import { useEffect } from "react";
import { GamesList } from "../Pagination/gameList/gamesList";
import { getGenres, getPlatforms } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
 

  // Obtén los datos de Genres y Platforms del estado Redux
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  // Carga los datos de Genres y Platforms al montar el componente
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, []);

  const handleOrderAZ = (e) => {
    dispatch(orderAZ(e.target.value));
  };

  const handleFilter = (e) => {
    dispatch(filterGenres(e.target.value));
  };

  const handleSourceFilter = (e) => {
    dispatch(filterSource(e.target.value));
  };

  return (
    <div>
      <div className={styles.image}></div>
      <div>
        <select className={styles.select} onChange={handleOrderAZ} key="orderSelect">
          <option>Order by Name</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
        <select className={styles.select} key="orderSelect2" >
          <option>Order by Ranking</option>
          <option>Ascendente</option>
          <option>Descendente</option>
        </select>
        <select className={styles.select} onChange={handleFilter}>
          <option>Platforms</option>
          {platforms.length &&
            platforms.map((platform) => (
              <option key={platform.id} value={platform.name}>
                {platform.name}
              </option>
            ))}
        </select>
        <select className={styles.select} onChange={handleFilter}>
          <option>Genres</option>
          {genres.length &&
            genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
        </select>
        <select className={styles.select} onChange={handleSourceFilter} key="orderSelect3">
          <option>Source</option>
          <option>All</option>
          <option>Created</option>
          <option>Not Created</option>
        </select>
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

// const mapDispatchToProps = (dispatch) => ({
//   setFilter: (value) => dispatch({ type: 'SET_FILTER', payload: value }),
// });

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, null )(Home);
