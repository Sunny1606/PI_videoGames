import { Route, Routes, useLocation } from "react-router-dom";
import PATHROUTES from "./components/Helpers/pathRoutes";
import LandingPage from "./components/LandingPage/landingPage";
import Nav from "./components/Nav/nav";
import Form from "./components/FormPage/form";
import Detail from "./components/Detail/detaillGame";
import Home from "./components/HomePage/homePage";
import axios from "axios";
import { useState } from "react";

function App() {
  //estado global para SearchBar
  const [games, setData] = useState([]);

  const handleSearch = async (name) => {
    try {
      const  data  = await axios(
        `http://localhost:3005/name/${name}`
      );
      if (data.name) {
        setData([...games, data]);
      } else {
        window.alert("No hay JUEGOS");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { pathname } = useLocation();

  return (
    <div>
      {pathname !== "/" && <Nav onSearch={handleSearch} />}

      <Routes>
        <Route path={PATHROUTES.LOGIN} element={<LandingPage />} />
        <Route path={PATHROUTES.HOME} element={<Home />} />
        <Route path={PATHROUTES.FORM} element={<Form />} />
        <Route path={PATHROUTES.DETAIL} component={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
