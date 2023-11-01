import styles from "./home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { filterGenres, filterSource } from "../../redux/actions";
import { useEffect, useState } from "react";
import { GamesList } from "../Pagination/gamesList";


import { getGenres, getPlatforms } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const [aux, setAux] = useState(false);

  // Obtén los datos de Genres y Platforms del estado Redux
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  // Carga los datos de Genres y Platforms al montar el componente
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  const handleOrder = (e) => {
    dispatch(orderGenres(e.target.value));
    setAux(!aux);
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
        <select className={styles.select} onChange={handleOrder}>
          <option>Order by Name</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
        <select className={styles.select} onChange={handleOrder}>
          <option>Order by Ranking</option>
          <option>Ascendente</option>
          <option>Descendente</option>
        </select>
        <select className={styles.select} onChange={handleFilter}>
          <option>Platforms</option>
          {platforms.map((platform) => (
            <option key={platform.result.id} value={platform.result.name}>
              {platform.result.name}
            </option>
          ))}
        </select>
        <select className={styles.select} onChange={handleFilter}>
          <option>Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        <select className={styles.select} onChange={handleSourceFilter}>
          <option>Source</option>
          <option>All</option>
          <option>Created</option>
          <option>Not Created</option>
        </select>
      <GamesList/>
      </div>
    </div>
  );
};

export default Home;
