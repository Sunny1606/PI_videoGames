//componente que  renderiza los detalles de un juego específico.

import { Link, useParams } from "react-router-dom";
import styles from "./detailGame.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Detail() {
  const { id } = useParams();

  const [data, setData] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3005/detail/${id}`)

      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        console.log("Error al obtener los detalles de videogame:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.conteiner}>
      <div className={styles.detail}>
        <div className={styles.titleH3}>
          <h2> {data.id}</h2>
          <h3> Name: {data.Name}</h3>
          <h3 className={styles.description}>
            Description: {data.Description}
          </h3>
          <h3>Released: {data.Released}</h3>
          <h3>Rating: {data.Rating}</h3>
          <h3>Genres: {data.Genres}</h3>
          <h3> Platforms: {data.Platforms}</h3>
        </div>
        <div className={styles.img}>
          <img src={data.Image} />
        </div>
      </div>

      <div className={styles.buttonConteiner}>
        <Link className={styles.button} to={"/home"}>
          <button> BACK </button>
        </Link>
      </div>
    </div>
  );
}
