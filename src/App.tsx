import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import StockDetails from "./components/StockDetails/StockDetails";
import LandingPage from "./components/LandingPage";
import StockHistory from "./components/StockDetails/StockHistory";
import FinancialHistory from "./components/History/FinancialHistory";
import PortfolioOverview from "./components/PortfolioOverview/PortfolioOverview";
import Homepage from "./components/Home/Homepage";
import ResearchPage from "./components/Research/ResearchPage";

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
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/history" element={<FinancialHistory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
