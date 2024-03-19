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
  const games = useSelector((state) => state.videogames);

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
    let aux = games;
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
    e.preventDefault();
    const formErrors = validation(userData);
    // Verifico si hay errores
    if (Object.keys(formErrors).length === 0) {
      // No hay errores, puede enviar la solicitud
      dispatch(postGame(userData));
      alert("Videojuego Creado!!");
      navigate("/home");
    } else {
      // Hay errores, actualiza el estado de los errores
      setErrors(formErrors);
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
  }, []);

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
              {errors.name && <p className={style.errorcito}>{errors.name}</p>}
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
                <p className={style.errorcito}>{errors.description}</p>
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
              {errors.img && <p className={style.errorcito}>{errors.img}</p>}
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
              {errors.release && (
                <p className={style.errorcito}>{errors.release}</p>
              )}
            </div>
            <div className={style.input}>
              <label>Rating </label>
              <input
                className="inputs"
                type="number"
                max="10"
                min="1"
                value={userData.rating}
                name="rating"
                onChange={handleChange}
              />
              {errors.rating && (
                <p className={style.errorcito}>{errors.rating}</p>
              )}
            </div>
          </div>
          <div className={style.conteinerSelect}>
            <select onChange={handlePlataforms}>
              {platform.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
            <div>
              <li className={style.list}>
                {userData.platforms.map((el) => el).join(" - ")}
              </li>
            </div>
          </div>

          <div>
            <div className={style.conteinerSelect}>
              <select onChange={handleGenre}>
                {genres.map((e) => (
                  <option key={e.name} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <li className={style.list}>
              {userData.genres.map((el) => el).join(" - ")}
            </li>
          </div>
        </div>
        <div className={style.buttonConteiner}>
          <button
            className={style.buttonCreated}
            type="submit"
            disabled={Object.keys(errors).length > 0}
          >
            Create
          </button>

          <Link to="/home" className={style.button}>
            <button>Back</button>
          </Link>
        </div>
      </form>
      <br />
      <br />

      <h2 className={style.titleh2}>Remove Platforms:</h2>
      {userData.platforms.map((el) => (
        <div className={style.conteinerFilter} key={el}>
          <p className={style.titleh2}> {el}</p>
          <button className={style.buttonX} onClick={() => handleDelete(el)}>
            X
          </button>
        </div>
      ))}
      <h2 className={style.titleh2}>Remove Genres:</h2>
      {userData.genres.map((el) => (
        <div className={style.conteinerFilter} key={el}>
          <p className={style.titleh2}>{el}</p>
          <button className={style.buttonX} onClick={() => handleDelete(el)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Form;
