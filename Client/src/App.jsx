import { Route, Routes, useLocation } from "react-router-dom";
import PATHROUTES from "./components/Helpers/pathRoutes";
import LandingPage from "./components/LandingPage/landingPage";
import Nav from "./components/Nav/nav";
import axios from "axios";
import { useState } from "react";
import Cards from "./components/GameCards/cards";
import Form from "./components/FormPage/form";
import Detail from "./components/Detail/detaillGame"

function App() {

  //cambios del estado
  const [videogames, setVideogames] = useState([]);


  const handleSearch = async (id) => {
    try {
      const { data } = await axios(
        `http://localhost:3005/games/${id}`
      );
      if (data.name) {
        setVideogames([...videogames, data]);
      } else {
        window.alert("No hay videogames con este ID");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hndleOnClose = (id) => {
    const filtro = videogames.filter((ch) => ch.id !== id);
    setVideogames(filtro);
  };


  const { pathname } = useLocation();

  return (
    <div>
      {pathname !== "/" && <Nav  onSearch={handleSearch}/>}
     
      <Routes>
        <Route path={PATHROUTES.LOGIN} element={<LandingPage />} />
        <Route path={PATHROUTES.FORM} element= {<Form/>} />
        <Route
            path={PATHROUTES.HOME}
            element={<Cards videogames={videogames} onClose={hndleOnClose} />}
          />
           <Route path={PATHROUTES.DETAIL} component={<Detail/>} />
      </Routes>
    </div>
  );
}

export default App;
