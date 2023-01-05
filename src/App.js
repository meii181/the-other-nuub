import "./App.css";
import "./index.css";
// import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Strategy from "./pages/Strategy";
import CasesClients from "./pages/Cases&Clients";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navigation from "./pages/Navigation";
import Footer from "./pages/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Home />
      <Services />
      <Strategy />
      <CasesClients />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
