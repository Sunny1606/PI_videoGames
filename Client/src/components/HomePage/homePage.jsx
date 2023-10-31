import styles from "./home.module.css";
// import { useState } from "react";
// import { filterCards, orderCards } from "../../redux/actions";
// import {useDispatch} from "react-redux";

const Home = () => {
  // const [aux, setAux] = useState(false);
  //   const dispatch = useDispatch();

  // // crear las actions de redux e importarlas
  //   const handleOrder = (e) => {
  //     dispatch(orderCards(e.target.value));
  //     setAux(!aux)
  //   };

  //   const handleFilter = (e) => {
  //     dispatch(filterCards(e.target.value));
  //   };

  return (
    <div>
      <div className={styles.image}></div>
      <div>
        <select className={styles.select}>
          <option>Order by Name</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
        <select className={styles.select}>
          <option>Order by Ranking</option>
          <option>Ascendente</option>
          <option>Descendente</option>
        </select>
        <select className={styles.select}>
          <option>Platforms</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
        <select className={styles.select}>
          <option>Genres</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
        <select className={styles.select}>
          <option>Source</option>
          <option>All</option>
          <option>Created</option>
          <option>Not Created</option>
        </select>
      </div>
    </div>
  );
};

export default Home;

// //
// <select className={styles.select}>
// <option value="action">Acción</option>
// <option value="action">Acción</option>
// </select>

// <select className={styles.select}>
// <option value="action">Acción</option>
// <option value="action">Acción</option>
// </select>

// <select className={styles.select}>
// <option value="action">Acción</option>
// <option value="action">Acción</option>
// </select>

// <select className={styles.select}>
// <option value="action">Acción</option>
// <option value="action">Acción</option>
// </select>
