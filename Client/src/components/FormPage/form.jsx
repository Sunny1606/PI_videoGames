import style from "./form.module.css";
import { useState } from "react";
import Validation from "./Validation";
import axios from "axios" ; 

const Form = () => {

  
  const [errors, setErrors] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    description: "",
    platform: "",
    image: "",
    date: "",
    rating: "",
    genres: [],  //porque es un array de obj 
  });

  const handleChange = (e) => {
    setErrors(Validation({ ...userData, [e.target.name]: e.target.value }));
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post("http://localhost:3005/createdgames", userData)
      .then(response => {
        console.log('Datos enviados correctamente:', response.data);
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
      });
  };

 


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h2 className={style.title}>Form Create Game</h2>
        </div>
        <div className={style.conteiner}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        
       
        <div className={style.conteiner}>
          <label htmlFor="platform">Platform:</label>
          <input
            type="text"
            id="platform"
            name="platform"
            required
            value={userData.platform}
            onChange={handleChange}
          />
        </div>


        <div className={style.conteiner}>
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            required
            value={userData.description}
            onChange={handleChange}
          ></textarea>
        </div>



        <div className={style.conteiner}>
          <label htmlFor="image"> URL Image:</label>
          <input
            type="url"
            id="image"
            name="image"
            required
            value={userData.image}
            onChange={handleChange}
          />
        </div>
        <div className={style.conteiner}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={userData.date}
            onChange={handleChange}
          />
        </div>



        <div className={style.conteiner}>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="10"
            required
            value={userData.rating}
            onChange={handleChange}
          />
        </div>


        
        <div className={style.conteiner}>
        <label htmlFor="genres">Géneros:</label>
        <div
          id="genres"
          name="genres"
          multiple
          value={userData.genres}
          onChange={handleChange}
          required
        ></div>
          <select className={style.select}>
          <option value="action">Acción</option>
          <option value="adventure">Aventura</option>
          <option value="strategy">Estrategia</option>
          <option value="rpg">RPG</option>
          </select>
        
      </div>
        <div>
          <button className={style.button}>SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
