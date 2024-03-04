import "./App.scss";
import "./index.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import RecoverPassword from "./pages/RecoverPassword";
import PasswordChange from "./pages/PasswordChange";
import LoggedInRoute from "./LoggedInRoute";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/recoverpassword" element={<RecoverPassword />} />
          <Route path="/passwordchange" element={<PasswordChange />} />
          <Route path="/loggedin/*" element={<LoggedInRoute />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
