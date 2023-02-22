import "./App.scss";
import "./index.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import ScrollUpButton from "./pages/ScrollUpButton";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/LoggedIntoSession/Dashboard";
import AppointmentList from "./pages/LoggedIntoSession/AppointmentList";
import Appointment from "./pages/LoggedIntoSession/Appointment";
import Profile from "./pages/LoggedIntoSession/Profile";
import UpdateProfile from "./pages/LoggedIntoSession/UpdateProfile";
import EmailConfirmationSent from "./pages/EmailConfirmationSent";
import AccountConfirmed from "./pages/LoggedIntoSession/AccountConfirmed"

function App() {
  return (
    <div className="App">
      <ScrollUpButton />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/appointmentlist" element={<AppointmentList />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/updateprofile" element={<UpdateProfile/>} />
          <Route path="/emailconfirm" element={<EmailConfirmationSent/>} /> 
          <Route path="/accountconfirmed" element={<AccountConfirmed/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
