import React from "react";
import AdminNavbar from "../components/navbar/AdminNavbar";
import { Outlet } from "react-router-dom";
import { Col, Row, Container } from "reactstrap";
const UserLayout = () => {
  return (
    <>
      {" "}
      <AdminNavbar />
      <Container fluid>
        <Row>
          <Col lg={10} md={8}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserLayout;
