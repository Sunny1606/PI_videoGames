<<<<<<< HEAD
import { Route, Routes } from "react-router-dom";
import PATHROUTES from "./components/Helpers/pathRoutes";
import LandingPage from "./components/LandingPage/landingPage";
// import Nav from "./components/Nav/nav";
import Form from "./components/FormPage/form";
import Detail from "./components/Detail/detaillGame";
import Home from "./components/HomePage/homePage";



function App() {
  


 
  

  return (
    <div>
     
   

=======

import { Route, Routes } from "react-router-dom";

import PATHROUTES from "./components/Helpers/pathRoutes";
import LandingPage from "./components/LandingPage/landingPage";
import Form from "./components/FormPage/form";
import Detail from "./components/Detail/detaillGame";
import Home from "./components/HomePage/homePage";

function App() {
  return (
    <div>
>>>>>>> 0c22b022bb39acc5e7ea7f768c7e2de90619afb7
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
