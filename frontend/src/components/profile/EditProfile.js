import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  CardBody,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import moment from "moment";
import { json, useNavigate } from "react-router-dom";
import { TostSucess } from "../commonFunctions/Tost.js";
import axios from "axios";
import ApiHeader from "../commonFunctions/ApiHeader.js";

const EditProfile = () => {
  const [userData, setUserData] = useState("");
  console.log("userData", userData);
  const navigate = useNavigate();

  //handle for getting credencials
  const handleGetAdminDetails = () => {
    const userDetails = sessionStorage.getItem("user");
    // console.log("userData", JSON.parse(userDetails));
    return JSON.parse(userDetails);
  };

  useEffect(() => {
    const data = handleGetAdminDetails();
    setUserData(data);
  }, []);

  //handlechange for handling events
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //handlesubmit for submiting form data
  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToUpdate = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      dob: userData.dob,
      email: userData.email,
      mobileNo: userData.mobileNo,
      //   createdAt: "2023-05-22T09:35:26.000Z",
      //   createdBy: null,
      //   gender: "male",
      //   id: 56,
      //   password: "$2b$10$pDbRlAjiHc4C3yDFkA.D8OKAUsrV49Cs8vWi5HJ8ZT5WyFoit3w/O",
      //   role: "admin",
      //   status: null,
      //   updateBy: null,
      //   updatedAt: "2023-05-22T09:35:26.000Z",
    };
    handleEditProfile(dataToUpdate);
  };

  //update sesstion storage

  const updateSesstonStorage = (value) => {
    let userDataToUpdate = JSON.parse(sessionStorage.getItem("user"));
    Object.keys(value).forEach(function (val, key) {
      userDataToUpdate[val] = value[val];
    });
    sessionStorage.setItem("user", JSON.stringify(userDataToUpdate));
  };

  //handleEditProfile function
  const handleEditProfile = async (dataToUpdate) => {
    let url = "http://localhost:3001/admin/user/profile";
    let header = ApiHeader;
    console.log("Profile data to update", dataToUpdate);
    try {
      const response = await axios.post(url, dataToUpdate, header);
      console.log("res of update", response);
      TostSucess("Profile is edited successfully!");
      navigate("/admin/profile");
      //   console.log("12345", JSON.parse(response.config.data  ));
      updateSesstonStorage(JSON.parse(response.config.data));

    } catch (error) {
      console.log("error in catch", error);
      //   setErrorName(error.response.data.error.split(" ")[0]);
      //   setError(error.response.data.error);
    }
  };
  return (
    <Container style={{ backgroundColor: "#eee", height: "100%" }}>
      <Row className=" py-5">
        {/* <Col lg={3} md={4}>
          <Card>
            <CardBody className=" text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{ width: "150px" }}
              />
              <h5 className="my-3">userData.firstName</h5>
              <p className="text-muted mb-1">Full Stack Developer</p>
              <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
            </CardBody>
          </Card>
        </Col> */}
        <h3 className="text-center mb-3 text-primary">Edit Your Profile</h3>
        <Col lg={3} md={8} className=""></Col>

        <Col lg={6} md={8} className="mt-auto">
          <Card className="mb-4">
            <CardBody>
              <Form role="form" onSubmit={handleSubmit}>
                <Row>
                  <Col sm={3}>
                    <p className="mb-0">FirstName</p>
                  </Col>
                  <Col sm={9}>
                    <Input
                      name="firstName"
                      type="text"
                      placeholder="Edit your name"
                      value={userData.firstName}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <p className="mb-0">LastName</p>
                  </Col>
                  <Col sm={9}>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Edit your name"
                      value={userData.lastName}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <p className="mb-0">Date of birth</p>
                  </Col>
                  <Col sm={9}>
                    <Input
                      name="dob"
                      placeholder="Edit your birth date"
                      type="date"
                      value={moment(userData.dob).utc().format("YYYY-MM-DD")}
                      onChange={handleChange}
                      min='1990-01-01' max='2023-01-01'
                      // onChange={handleChange}
                      // required
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <p className="mb-0">Email</p>
                  </Col>
                  <Col sm={9}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Edit your email"
                      value={userData.email}
                      onChange={handleChange}
                      disabled
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <p className="mb-0">Mobile No</p>
                  </Col>
                  <Col sm={9}>
                    <Input
                      type="number"
                      name="mobileNo"
                      placeholder="Edit your mobile number"
                      value={userData.mobileNo}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <p className="mb-0">Role</p>
                  </Col>
                  <Col sm={9}>
                    <Input
                      type="text"
                      name="role"
                      placeholder="Edit your email"
                      value={userData.role}
                      disabled
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}></Col>
                  <Col
                    sm={6}
                    className="text-center d-flex justify-content-around"
                  >
                    <Button
                      color="warning"
                      onClick={() => navigate("/admin/profile")}
                    >
                      Cancel
                    </Button>

                    <Button color="primary ">Submit</Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
