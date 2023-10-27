import { Route, Routes } from "react-router-dom";
import "./App.css";
import PATHROUTES from "./components/Helpers/pathRoutes";
// import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/landingPage";

function App() {
  // const { pathname } = useLocation();
  return (


    
    <div className="App">
      {/* {pathname === "/home" && <Nav />} */}
      <Routes>
        <Route path={PATHROUTES.LOGIN} element={<LandingPage />} />
        <Route path={PATHROUTES.HOME} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
