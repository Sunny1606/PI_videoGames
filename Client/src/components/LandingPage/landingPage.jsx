import { Link } from "react-router-dom";
import styles from "./landing.module.css";

const LandingPage = () => {
  return (
   <div className={styles.landingPage}>
     <div className={styles.content}>
      <h1 className={styles.title}>BIENVENIDOS A VIDEOGAMES</h1>
      <Link>
        <button className={styles.button}>EMPEZAR</button>
      </Link>
    </div>
   </div>
  );
};

export default LandingPage;
