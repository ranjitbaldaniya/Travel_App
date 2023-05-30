import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

const AuthNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="#">Travel_App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
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
        </Collapse>
      </Navbar>
    </>
  );
};

export default AuthNavbar;
