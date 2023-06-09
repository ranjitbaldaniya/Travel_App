import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Button } from "reactstrap";
import logo from "../../assets/logo.png";

const AuthNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState("");

  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  //handle for getting credencials
  const handleGetAdminDetails = () => {
    const userDetails = sessionStorage.getItem("user");
    console.log("123", JSON.parse(userDetails));
    return JSON.parse(userDetails);
  };

  useEffect(() => {
    const data = handleGetAdminDetails();
    setUserData(data);
    setUserName(data?.firstName);
  }, [sessionStorage.getItem("user")]);

  //handlelogout
  const handleLogout = () => {
    console.log("clicked");
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <>
      <Navbar color="light" light expand="md">
        <Link to="/">
          <NavbarBrand className="text-warning">
            {" "}
            <img src={logo} alt="" />
            <span className="text-primary ">Travel_App</span>
          </NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {userData ? (
            <>
              {" "}
              <Nav className="ms-auto " navbar>
                <NavItem>
                  <NavLink>
                    {/* <Link to="/" className="text-light"> */}{" "}
                    <h4 className="text-primary mt-1"> Welcome {userName}</h4>
                    {/* </Link> */}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <Button color="primary" onClick={handleLogout}>
                      {" "}
                      Logout
                    </Button>
                  </NavLink>
                </NavItem>
                <NavItem></NavItem>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="ms-auto" navbar>
                <NavItem>
                  <NavLink>
                    <Link to="/" className="text-primary">
                      {" "}
                      Tour Packages
                    </Link>
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav navbar>
                <NavItem>
                  <NavLink>
                    <Link to="/login" className="text-primary">
                      {" "}
                      Login
                    </Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <Link to="/register" className="text-primary">
                      {" "}
                      Register
                    </Link>
                  </NavLink>
                </NavItem>
              </Nav>
            </>
          )}
        </Collapse>
      </Navbar>
    </>
  );
};

export default AuthNavbar;
