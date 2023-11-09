import { Route, Routes } from "react-router-dom";
import PATHROUTES from "./components/Helpers/pathRoutes";
import LandingPage from "./components/LandingPage/landingPage";
import Form from "./components/FormPage/form";
import Detail from "./components/Detail/detaillGame";
import Home from "./components/HomePage/homePage";

function App() {
  return (
    <div>
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
