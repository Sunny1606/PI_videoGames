// import { useState } from "react";
import PATHROUTES from "../Helpers/pathRoutes";
import SearchBar from "../SearchBar/searchBar";
import styles from "./Nav.module.css";
import { Link } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const Nav = ({onSearch}) => {
  return (
    <div className={styles.nav}>
      <SearchBar onSearch={onSearch} className={styles.SearchBar} />

      <div className={styles.links}>
        <button className={styles.button}>
          <Link className={styles.links} to={PATHROUTES.HOME}>
            HOME
          </Link>
        </button>

        <button className={styles.button}>
          <Link className={styles.links} to={PATHROUTES.FORM}>
            CREATE
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Nav;
