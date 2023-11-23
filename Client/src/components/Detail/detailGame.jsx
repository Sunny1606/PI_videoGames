//componente que  renderiza los detalles de un juego específico.

import { Link, useParams } from "react-router-dom";
import styles from "./detailGame.module.css";

import { useEffect, useState } from "react";
import axios from "axios";


export default function Detail() {
  const { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    // Obtener datos de la API
    const solicitudApi = axios.get(`http://localhost:3005/detail/${id}`);

try {

} catch (error) {
  
}



    
    // Obtener datos de la base de datos local
    const solicitudBaseDeDatosLocal = 
  
    // Utilizar Promise.all para esperar a que ambas solicitudes se completen
    Promise.all([solicitudApi, solicitudBaseDeDatosLocal])
      .then((respuestas) => {
        const datosApi = respuestas[0].data;
        const datosBaseDeDatosLocal = respuestas[1]; // Reemplaza esto con los datos reales de la base de datos local
  
        // Combinar datos de ambas fuentes, asumiendo que la estructura de datos es similar
        const datosCombinados = { ...datosApi, ...datosBaseDeDatosLocal };
  
        // Actualizar el estado con los datos combinados
        setData(datosCombinados);
      })
      .catch((errores) => {
        console.log("Error al obtener datos:", errores);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3005/detail/${id}`)

  //     .then(({ data }) => {
  //       setData(data);
  //     })
  //     .catch((error) => {
  //       console.log("Error al obtener los detalles de videogame:", error);
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
