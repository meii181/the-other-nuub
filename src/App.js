import "./App.scss";
import "./index.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PriceCalculator from "./pages/PriceCalculator";
import "bootstrap/dist/css/bootstrap.min.css";
import ScrollUpButton from "./pages/ScrollUpButton";
import Final from "./pages/Final";

function App() {
  return (
    <div className="App">
      <ScrollUpButton />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/price-calculator" element={<PriceCalculator />} />
          <Route path="/final" element={<Final />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
