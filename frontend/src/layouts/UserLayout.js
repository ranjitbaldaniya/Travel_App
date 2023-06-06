import React from "react";
import AdminNavbar from "../components/navbar/AdminNavbar";
import { Outlet } from "react-router-dom";
import { Col, Row, Container } from "reactstrap";
import AuthNavbar from "../components/navbar/AuthNavbar";
const UserLayout = () => {
  return (
    <>
      {" "}
      <AuthNavbar />
      {/* <Container fluid>
        <Row>
        <Col lg={4} md={12}>
            <Outlet />
          </Col>
          <Col lg={12} md={12}> */}
      <Outlet />
      {/* </Col>
        </Row>
      </Container> */}
    </>
  );
};

export default UserLayout;
