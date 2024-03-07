import "./App.scss";
import "./index.scss";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import RecoverPassword from "./pages/RecoverPassword";
import PasswordChange from "./pages/PasswordChange";
import Dashboard from "./pages/LoggedIntoSession/Dashboard";
import AppointmentList from "./pages/LoggedIntoSession/AppointmentList";
import AddAppointment from "./pages/LoggedIntoSession/AddAppointment";
import Profile from "./pages/LoggedIntoSession/Profile";
import UpdateProfile from "./pages/LoggedIntoSession/UpdateProfile";
import AccountConfirmed from "./pages/AccountConfirmed";
import UpdatedAppointmentConfirmation from "./pages/LoggedIntoSession/UpdatedAppointmentConfirmation";
import CancelledAppointmentConfirmation from "./pages/LoggedIntoSession/CancelledAppointmentConfirmation";
import ConfirmedAppointment from "./pages/LoggedIntoSession/ConfirmedAppointment";
import EditAppointment from "./pages/LoggedIntoSession/EditAppointment";




function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === "true");

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  //   localStorage.setItem("isLoggedIn", "true");
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   localStorage.removeItem("isLoggedIn");
  // }

  return (
    <div className="App">
      <Router>
        <Routes>
          Avilable for everyone
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/recoverpassword" element={<RecoverPassword />} />
          <Route path="/passwordchange" element={<PasswordChange />} />

          {/* These pages are available only after logging in or creating account */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addappointment" element={<AddAppointment />} />
          <Route path="/appointmentlist" element={<AppointmentList />} />
          <Route path="/profile" element={< Profile />} />
          <Route path="/updateprofile" element={<UpdateProfile/>} />
          <Route path="/accountconfirmed" element={<AccountConfirmed />} />
          <Route path="/editappointment" element={<EditAppointment />} />
          <Route 
            path="/updatedappointmentconfirm"
            element={< UpdatedAppointmentConfirmation />}
          />
          <Route
            path="/cancelledappointmentconfirm"
            element={<CancelledAppointmentConfirmation />}
          />
          <Route
            path="/appointmentconfirm"
            element={<ConfirmedAppointment />}
          /> 
          {/* <Route path="/*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
