//componente que  renderiza los detalles de un juego específico.

import { Link, useParams } from "react-router-dom";
import styles from "./detailGame.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useEffect } from "react";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const games = useSelector((state) => state.detail);

  console.log(games);

  useEffect(() => {
    setTimeout(() => dispatch(getDetail(id)), 3000);
    return () => dispatch(getDetail());
  }, [dispatch, id]);

  

  return (
    <div>
      <h1>{games.name}</h1>
      <div className={styles.image}></div>
      <div className="subtitle">Rating:</div>
      <div className="text">{games.rating}</div>
      <div className="subtitle">Released:</div>
      <div className="text">{games.released.split("T").shift()}</div>
      <div className="subtitle">Description:</div>
      <div className="text" id="description">
        {games.description}
      </div>
      <div>
        <div className="subtitle">Genres:</div>
        <div className="text">{games.genres.map((el) => el + " ")}</div>
      </div>
      <div>
        <div className="subtitle">Platforms:</div>
        <div className="text">{games.platforms}</div>
      </div>
      <div>
        <Link to="/home">
          <button id="landButton" className="btnD">
            volver
          </button>
        </Link>
      </div>
    </div>
  );
}


