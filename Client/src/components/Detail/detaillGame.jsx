import { Link, useParams } from "react-router-dom";
import styles from "./detailGame.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useEffect } from "react";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const myGame = useSelector((state) => state.detail);

  useEffect(() => {
    setTimeout(() => dispatch(getDetail(id)), 3000);
    return () => dispatch(getDetail());
  }, [dispatch, id]);

  console.log(myGame.released);
  return (
    <div className={styles.detailConteiner}>
      {myGame.length === 0 ? (
        <img
          src="https://i.imgur.com/WxAdVOx.gif"
          alt="Loading..."
          className="loaderDetail"
        />
      ) : (
        <div className={styles.detail}>
          <h1>{myGame.name}</h1>
          <div className={styles.image}>
            <img
              src={
                myGame.image ? myGame.image : "https://i.imgur.com/Xb3J9Cz.png"
              }
              alt=""
             
              
            />
          </div>
          <div className="subtitle">Rating:</div>
          <div className="text">{myGame.rating}</div>
          <div className="subtitle">Released:</div>
          <div className="text">{myGame.released.split("T").shift()}</div>
          <div className="subtitle">Description:</div>
          <div className="text" id="description">
            {myGame.description}
          </div>
          <div>
            <div className="subtitle">Genres:</div>
            <div className="text">{myGame.genres.map((el) => el + " ")}</div>
          </div>
          <div>
            <div className="subtitle">Platforms:</div>
            <div className="text">{myGame.platforms}</div>
          </div>
        </div>
      )}
      <div className="botonDetalle">
        <Link to="/home">
          <button id="landButton" className="btnD">
            volver
          </button>
        </Link>
      </div>
    </div>
  );
}
