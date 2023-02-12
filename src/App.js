import "./App.scss";
import "./index.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import ScrollUpButton from "./pages/ScrollUpButton";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Confirmation from "./pages/Confirmation";
import RecoverPassword from "./pages/RecoverPassword";
import PasswordRecovered from "./pages/PasswordRecovered";

function App() {
  return (
    <div className="App">
      <ScrollUpButton />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/recoverpassword" element={<RecoverPassword />} />
          <Route path="/passwordrecovered" element={<PasswordRecovered />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
