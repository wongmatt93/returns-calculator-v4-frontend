import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import StockDetails from "./components/StockDetails";
import LandingPage from "./components/LandingPage";
import Overview from "./components/Overview";
import FinancialsPage from "./components/FinancialsPage";
import StockHistory from "./components/StockHistory";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/stocks/:ticker/details" element={<StockDetails />} />
          <Route path="/stocks/:ticker/history" element={<StockHistory />} />
          <Route path="/financials" element={<FinancialsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
