import React from "react";
import AdminNavbar from "../components/navbar/AdminNavbar";
import { Outlet } from "react-router-dom";
import { Col, Row, Container } from "reactstrap";
import SidebarAdmin from "../views/dashboard/SidebarAdmin";
import { ToastContainer } from "react-toastify";

const Admin = (props) => {
  return (
    <>
      <AdminNavbar />
      <Container fluid>
      <ToastContainer/>
        <Row>
          <Col lg={2} md={4}>
            <SidebarAdmin />
          </Col>
          <Col lg={10} md={8}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Admin;
