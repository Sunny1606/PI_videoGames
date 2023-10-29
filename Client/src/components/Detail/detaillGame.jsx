import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from './detailGame.module.css';

const Detail = () => {
  const {id} = useParams();
  const [games, setGames] = useState({});

  useEffect(() => {
    axios(`http://localhost:3005/games/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setGames(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      }
    );
    return setGames({});
  }, [id]);

  return (
      <div className={styles.detail}>
        <h2>{games?.name}</h2>
        <h2>{games?.description}</h2>
        <h2>{games?.platform}</h2>
        <h2>{games?.rating}</h2>
        <h2>{games?.date}</h2>
        <h2>{games?.genres}</h2>
        <img src={games?.image} alt="" />
      </div>
  )
};

export default Detail;