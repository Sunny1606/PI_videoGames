//componente que  renderiza los detalles de un juego específico.

import { Link, useParams } from "react-router-dom";
import styles from "./detailGame.module.css";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Detail() {
  const { id } = useParams();

  const [videogames, setVideogame] = useState({});

  console.log(videogames);

  useEffect(() => {
    axios
      .get(`http://localhost:3005/${id}`)
      .then(({ data }) => {
        setVideogame(data);
        console.log(data);
      })
      .catch((error) => {
        console.log("Error al obtener los detalles de videogame:", error);
      });
  }, []);

  return (
    <div className={styles.conteiner}>
      <div className={styles.detail}>
        <h1>{videogames?.name}</h1> <span> ID:{videogames?.id}</span>
        <div className={styles.titleH3}>
          <h3>{videogames?.description}</h3>
          <h3>Released: {videogames?.released}</h3>
          <h3>Rating: {videogames?.rating}</h3>
          <h3>Genre: {videogames?.genre}</h3>
          <h3>Platforms: {videogames?.plataformas}</h3>
        </div>
        <img src={videogames?.Imagen} alt={videogames?.name} />
      </div>

      <div className={styles.buttonConteiner}>
        <Link className={styles.button} to={"/home"}>
          <button> BACK </button>
        </Link>
      </div>
    </div>
  );
}
