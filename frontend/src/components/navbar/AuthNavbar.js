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
import { PopupMenu } from "react-simple-widgets";
import { Button } from "reactstrap";
const AuthNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState("");

  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  //handle for getting credencials
  const handleGetAdminDetails = () => {
    const userDetails = sessionStorage.getItem("user");
    // console.log("123" , JSON.parse(userDetails));
    return JSON.parse(userDetails);
  };

  useEffect(() => {
    const data = handleGetAdminDetails();
    setUserData(data);
    setUserName(data?.firstName);
  }, [sessionStorage.getItem("user")]);

  //handlelogout
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <>
      <Navbar color="dark" dark expand="md">
        <Link to="/">
          <NavbarBrand className="text-warning">Travel_App</NavbarBrand>
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
                    <h4 className="text-warning"> Welcome {userName}</h4>
                    {/* </Link> */}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <div className="topRight">
                      <PopupMenu>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                          alt="avatar"
                          className="rounded-circle img-fluid"
                          style={{ width: "35px" }}
                        />

                        <div className="card text-start">
                          <div className="card-body px-4 py-4">
                            <div
                              id="circle-avatar"
                              className="text-center mx-auto mb-4"
                            >
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                alt="avatar"
                                className="rounded-circle img-fluid"
                                style={{ width: "50px" }}
                              />
                            </div>

                            <h5 className="text-center mb-0">{userName}</h5>
                            <p className="text-center mb-2">{userData.email}</p>

                            <hr style={{ margin: "0 -24px 24px" }} />

                            <div className="d-grid">
                              <Button
                                className="btn btn-secondary"
                                onClick={handleLogout}
                              >
                                Logout
                              </Button>
                            </div>
                          </div>
                        </div>
                      </PopupMenu>
                    </div>
                  </NavLink>
                </NavItem>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="ms-auto text-dark" navbar>
                <NavItem>
                  <NavLink>
                    <Link to="/" className="text-light">
                      {" "}
                      Tour
                    </Link>
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav navbar>
                <NavItem>
                  <NavLink>
                    <Link to="/login" className="text-light">
                      {" "}
                      Login
                    </Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <Link to="/register" className="text-light">
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
