import { Link } from "react-router-dom";
import styles from "./landing.module.css";
import PATHROUTES from "../Helpers/pathRoutes";

const LandingPage = () => {


  
  return (
    <div>
      <div className={styles.image}></div>
      <h1 className={styles.title}>Welcome to VideoGames</h1>
      <button className={styles.button}>
        <Link className={styles.button} to={PATHROUTES.HOME}>
          GO IT!
        </Link>
      </button>
    </div>
  );
};

export default LandingPage;
