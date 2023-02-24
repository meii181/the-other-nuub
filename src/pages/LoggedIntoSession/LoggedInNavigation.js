import React from "react";
import { Nav, Navbar, Stack } from "react-bootstrap";
import nuub from "../../assets/img/cropped-nuub_logo.png";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

const LoggedInNavigation = () => {

  // const [logout, setLogout] = useState("");
  // const navigate = useNavigate();

  // axios.post("http://localhost/api/logout.php")
  // .then((response) => {
  //   if(response.data === "Logout successful"){
  //     setLogout(response.data);
  //     navigate("/login");
  //   }
  // })
  // .catch((error) => {
  //   console.log(error);
  // })

    return (
        <Navbar className="loggedInNavigation pt-3" expand="lg" style={{backgroundColor: "#EBBFF3", borderBottom: "4px solid black"}}>
            <Navbar.Brand href="/dashboard" className="nuub ms-2 p-2">
                <img src={nuub} width="246px" height="83px" alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse>
                <Stack direction="horizontal" gap={3} className="ms-auto">
          <Nav
            className="nav justify-content-end me-auto"
            style={{ fontSize: 30, fontWeight: "bold", fontFamily: "primary-font" }}
          >
            <Nav.Link href="/profile" className="me-4">
              My profile
            </Nav.Link>
            <Nav.Link href="/appointmentlist" className="me-4">
              My appointments
            </Nav.Link><Nav.Link className="me-5" style={{color: "#EB3131"}}>
              Sign Out
            </Nav.Link>
          </Nav>
        </Stack>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default LoggedInNavigation;