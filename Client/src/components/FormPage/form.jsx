import style from "./form.module.css";
import { useEffect, useState } from "react";
import { postGame, getGenres } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import validation from "./Validation";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const genres = useSelector((state) => state.genres);
  const videogames = useSelector((state) => state.games);


  //estado local de errores y inputs objetos
  const [errors, setErrors] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    description: "",
    image: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
  });

  const getPlatforms = function () {
    let aux = videogames;
    let aux2 = aux.map((e) => e.platforms).flat(5);
    let aux3 = new Set(aux2);
    let plat = [...aux3];
    return plat;
  };
  const platform = getPlatforms();

  //-----------------------------------

  function handleChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validation({
        ...userData,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleGenre(e) {
    setUserData({
      ...userData,
      genres: [...userData.genres, e.target.value],
    });
  }

  function handlePlataforms(e) {
    setUserData({
      ...userData,
      platforms: [...userData.platforms, e.target.value],
    });
  }


  function handleSubmit(e) {
    if (
      userData.name.length &&
      userData.description.length &&
      userData.platforms.length
      // !input.rating > 5 &&
      // !input.rating < 1
    ) {
      e.preventDefault();
      dispatch(postGame(userData));
      alert("Videojuego Creado!!");
      setUserData({
        name: "",
        description: "",
        image: "",
        released: "",
        rating: "",
        platforms: [],
        genres: [],
      });
      navigate("/home");
    } else {
      e.preventDefault();
      alert("Formulario incompleto");
    }
  }


  function handleDelete(el) {
    setUserData({
      ...userData,
      genres: userData.genres.filter((gen) => gen !== el),
      platforms: userData.platforms.filter((plat) => plat !== el),
    });
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);


  return (
    <div className={style.conteiner}>
      <h1 className={style.titleH1}>Create New Videogame</h1>
      <form onSubmit={(e) => handleSubmit(e)} className={style.formulario}>
        <div>
          <div>
            <div className={style.input}>
              <label>Name </label>
              <input
                className="inputs"
                type="text"
                value={userData.name}
                name="name"
                onChange={handleChange}
              />
              {errors.name && <p className="errorcito">{errors.name}</p>}
            </div>
            <div className={style.input}>
              <label>Description </label>
              <input
                className="inputs"
                type="text"
                value={userData.description}
                name="description"
                onChange={handleChange}
              />
              {errors.description && (
                <p className="errorcito">{errors.description}</p>
              )}
            </div>
            <div className={style.input}>
              <label>Image </label>
              <input
                className="inputs"
                type="text"
                value={userData.image}
                name="image"
                onChange={handleChange}
              />
              {errors.img && <p className="errorcito">{errors.img}</p>}
            </div>
            <div className={style.input}>
              <label>Release Date </label>
              <input
                className="inputs"
                type="date"
                value={userData.released}
                name="released"
                onChange={handleChange}
              />
              {errors.release && <p className="errorcito">{errors.release}</p>}
            </div>
            <div className={style.input}>
              <label>Rating </label>
              <input
                className="inputs"
                type="number"
                value={userData.rating}
                name="rating"
                onChange={handleChange}
              />
              {errors.rating && <p className="errorcito">{errors.rating}</p>}
            </div>
          </div>
          <div>
            <div className="custom-select">
              <select onChange={handleGenre} className="select-css">
                {genres.map((e) => (
                  <option key={e.name} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <li>{userData.genres.map((el) => el).join(" - ")}</li>
            <div className="custom-select">
              <select onChange={handlePlataforms} className="select-css">
                {platform.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <li>{userData.platforms.map((el) => el).join(" - ")}</li>
          </div>
        </div>
        <div id="divButtons">
          <button type="submit" className="add_button">
            Create
          </button>
          <Link to="/home">
            <button className="add_button">Back</button>
          </Link>
        </div>
      </form>
      <br />
      <br />
      <div className="conteiner remove">
        <h2>Remove Platforms:</h2>
        {userData.platforms.map((el) => (
          <div className="cardRemove" key={el}>
            <p> {el}</p>
            <button className="delete" onClick={() => handleDelete(el)}>
              X
            </button>
          </div>
        ))}
        <h2>Remove Genres:</h2>

        {userData.genres.map((el) => (
          <div className="cardRemove" key={el}>
            <p>{el}</p>
            <button className="delete" onClick={() => handleDelete(el)}>
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
