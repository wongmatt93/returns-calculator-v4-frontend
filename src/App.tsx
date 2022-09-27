import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import StockDetails from "./components/StockDetails";
import LandingPage from "./components/LandingPage";
import Overview from "./components/Overview";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/stocks/:ticker/details" element={<StockDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
