import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const Profile = () => {
  const [userData, setUserData] = useState("");
  // console.log(userData)

  //handle for getting credencials
  const handleGetAdminDetails = () => {
    const userDetails = sessionStorage.getItem("user");
    console.log("123", JSON.parse(userDetails));
    return JSON.parse(userDetails);
  };

  useEffect(() => {
    const data = handleGetAdminDetails();
    setUserData(data);
  }, []);
  return (
    <Container style={{ backgroundColor: "#eee", height: "100%" }}>
      <Row className="mt-5 py-5">
        <Col lg={3} md={4}>
          <Card>
            <CardBody className=" text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{ width: "150px" }}
              />
              <h5 className="my-3">{userData.firstName}</h5>
              <p className="text-muted mb-1">Full Stack Developer</p>
              <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
              {/* <div className="d-flex justify-content-center mb-2">
              <button type="button" className="btn btn-primary">
                Follow
              </button>
              <button type="button" className="btn btn-outline-primary ms-1">
                Message
              </button>
            </div> */}
            </CardBody>
          </Card>
        </Col>
        <Col lg={9} md={8} className="mt-auto">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">
                    {userData.firstName} {userData.lastName}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{userData.email}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Date of Birth</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{userData.dob}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Mobile</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{userData.mobileNo}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Role</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{userData.role}</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
        {/* 
        <section style={{ backgroundColor: "#eee" }}>
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 className="my-3">John Smith</h5>
                  <p className="text-muted mb-1">Full Stack Developer</p>
                  <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                  <div className="d-flex justify-content-center mb-2">
                    <button type="button" className="btn btn-primary">
                      Follow
                    </button>
                    <button type="button" className="btn btn-outline-primary ms-1">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">Johnatan Smith</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">example@example.com</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">(097) 234-5678</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Mobile</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">(098) 765-4321</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          
        </section> */}
      </Row>
    </Container>
  );
};

export default Profile;
