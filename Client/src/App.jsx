import { Route, Routes } from "react-router-dom";
import PATHROUTES from "./components/Helpers/pathRoutes";
import LandingPage from "./components/LandingPage/landingPage";
import Form from "./components/FormPage/form";
import Detail from "./components/Detail/detailGame";
import Home from "./components/HomePage/homePage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGames } from "./redux/actions";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Routes>
        <Route path={PATHROUTES.LOGIN} element={<LandingPage />} />
        <Route path={PATHROUTES.HOME} element={<Home />} />
        <Route path={PATHROUTES.FORM} element={<Form />} />
        <Route path= "/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
