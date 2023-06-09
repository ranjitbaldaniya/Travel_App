import React from "react";
import { Outlet } from "react-router-dom";
import AuthNavbar from "../components/navbar/AuthNavbar";
import Navbars from "../views/home/Navbars";
import Footer from "../views/home/Footer";


const Auth = () => {
  return (
    <>
      <AuthNavbar/>
      <Outlet />
      <Footer/>
    </>
  );
};

export default Auth;
