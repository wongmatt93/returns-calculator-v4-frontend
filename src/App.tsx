import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import StockDetails from "./components/StockDetails";
import LandingPage from "./components/LandingPage";
import StockHistory from "./components/StockHistory";
import FinancialHistory from "./components/FinancialHistory";
import PortfolioOverview from "./components/PortfolioOverview";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/portfolio" element={<PortfolioOverview />} />
          <Route path="/stocks/:ticker/details" element={<StockDetails />} />
          <Route path="/stocks/:ticker/history" element={<StockHistory />} />
          <Route path="/history" element={<FinancialHistory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
