import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import StockDetails from "./components/StockDetails";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/overview" element={<Main />} />
          <Route path="/stocks/:ticker/details" element={<StockDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
