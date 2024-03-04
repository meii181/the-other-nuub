import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function LoggedInRoute() {
    return(
        <Router>
            <Routes>
            <Route path="/loggedin/dashboard" element={<Dashboard />} />
          <Route path="/addappointment" element={<AddAppointment />} />
          <Route path="/appointmentlist" element={<AppointmentList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/accountconfirmed" element={<AccountConfirmed />} />
          <Route path="/editappointment" element={<EditAppointment />} />
          <Route
            path="/updatedappointmentconfirm"
            element={<UpdatedAppointmentConfirmation />}
          />
          <Route
            path="/cancelledappointmentconfirm"
            element={<CancelledAppointmentConfirmation />}
          />
          <Route
            path="/appointmentconfirm"
            element={<ConfirmedAppointment />}
          /> 
            </Routes>
        </Router>
    )
}

export default LoggedInRoute;