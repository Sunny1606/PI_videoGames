import styles from "./card.module.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Card({ name, image, id, genres, rating }) {
  return (
    <div className="card">
      <Link
        to={`/games/${id}`}
      >
        <h3>{name}</h3>
        <img
          src={image}
          alt=""
        />
      </Link>
      <div >
        <span className={styles.span}>{` |${genres}| `}</span>
        <span className={styles.span2}>{rating}</span>
      </div>
    </div>
  );
}

export default Card;
