import React from "react";
import { Outlet } from "react-router-dom";
import AuthNavbar from "../components/navbar/AuthNavbar";
import { Container } from "reactstrap";

const Auth = () => {
  return (
    <>
      <AuthNavbar />
      <Outlet />
    </>
  );
};

export default Auth;
