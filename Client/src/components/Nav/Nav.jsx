import PATHROUTES from "../Helpers/pathRoutes";
import SearchBar from "../SearchBar/searchBar";
import styles from "./Nav.module.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className={styles.nav}>
      {/* <button onClick={() => onSearch(random)} className={styles.onSearch}>
        Random //si quiero puedo crear el boton RANDOM
      </button> */}
      <SearchBar className={styles.SearchBar} />

      <div className={styles.links}>
        <button className={styles.button}>
          <Link className={styles.links} to={PATHROUTES.HOME}>
            HOME
          </Link>
        </button>

        <button className={styles.button}>
          <Link className={styles.links} to={PATHROUTES.HOME}>
            CREATE
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Nav;
