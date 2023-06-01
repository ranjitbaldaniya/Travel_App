import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiHeader from "../commonFunctions/ApiHeader.js";
import {
  Button,
  Card,
  Form,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Label,
  FormGroup,
  InputGroup,
} from "reactstrap";
import axios from "axios";
import moment from "moment";
import { TostSucess } from "../commonFunctions/Tost.js";

const EditUser = () => {
  const [userData, setUserData] = useState({});
  console.log("userData", userData);
  const [errorName, setErrorName] = useState("");
  const [error, setError] = useState(null);
  // console.log("errorName", errorName);
  const Params = useParams();
  const userId = Params.id;
  const navigate = useNavigate();
  console.log(userId);
  //handleGetUser
  const handleGetUser = async () => {
    let url = `http://localhost:3001/admin/user/edit/${userId}`;
    let header = ApiHeader;
    try {
      const response = await axios.get(url, header);
      console.log("res", response);
      setUserData(response.data);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  //useEffect for handleGetUser
  useEffect(() => {
    handleGetUser();
  }, []);

  //handlechange for handling events
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //handlesubmit for submiting form data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("123", userData);

    const dataToUpdate = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      dob: userData.dob,
      email: userData.email,
      mobileNo: userData.mobileNo,
      gender: userData.gender,
      role: userData.role,
      //   createdAt: "2023-05-22T09:35:26.000Z",
      //   createdBy: null,
      //   id: 56,
      //   password: "$2b$10$pDbRlAjiHc4C3yDFkA.D8OKAUsrV49Cs8vWi5HJ8ZT5WyFoit3w/O",
      //   status: null,
      //   updateBy: null,
      //   updatedAt: "2023-05-22T09:35:26.000Z",
    };
    handleEditProfile(dataToUpdate);
  };

  //handleEditProfile function
  const handleEditProfile = async (dataToUpdate) => {
    let url = `http://localhost:3001/admin/user/update/${userId}`;
    let header = ApiHeader;
    console.log("Profile data to update", dataToUpdate);
    try {
      const response = await axios.post(url, dataToUpdate, header);
      console.log("res of update", response);
      TostSucess("User is edited successfully!");
      navigate("/admin/users");
      //   console.log("12345", JSON.parse(response.config.data  ));
    } catch (error) {
      console.log("error in catch", error);
      //   setErrorName(error.response.data.error.split(" ")[0]);
      //   setError(error.response.data.error);
    }
  };

  //error div
  const errorDiv = error ? (
    <div className="error">
      <i class="text-danger">{error}</i>
    </div>
  ) : (
    ""
  );

  return (
    <Container style={{ backgroundColor: "#eee", height: "100%" }}>
      <Row>
        <div className="text-center text-dark mb-4 mt-5">
          <h5>Edit User</h5>
        </div>

        <Col lg={2} md={1}></Col>

        <Col lg={8} md={10}>
          <Card>
            <CardBody>
              <Form role="form" onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Firstname</Label>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input
                      name="firstName"
                      placeholder="Enter your firstname"
                      type="text"
                      value={userData.firstName}
                      onChange={handleChange}
                      // required
                    />
                  </InputGroup>
                  {/* {console.log("error" , errorName == '"firstName"')} */}
                  {errorName == '"firstName"' ? (
                    <span>{errorDiv}</span>
                  ) : (
                    <span></span>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Lastname</Label>

                  <InputGroup className="input-group-alternative mb-3">
                    <Input
                      name="lastName"
                      placeholder="Enter your lastname"
                      type="text"
                      value={userData.lastName}
                      onChange={handleChange}
                      // required
                    />
                  </InputGroup>
                  {errorName == '"lastName"' ? (
                    <span>{errorDiv}</span>
                  ) : (
                    <span></span>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Email</Label>

                  <InputGroup className="input-group-alternative mb-3">
                    <Input
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                      value={userData.email}
                      onChange={handleChange}
                      disabled
                      // required
                    />
                  </InputGroup>
                  {errorName == '"email"' ? (
                    <span>{errorDiv}</span>
                  ) : (
                    <span></span>
                  )}
                </FormGroup>

                <Row>
                  <Col lg={6} md={12}>
                    <FormGroup>
                      <Label>Mobile number</Label>

                      <InputGroup className="input-group-alternative">
                        <Input
                          name="mobileNo"
                          placeholder="Enter your number"
                          type="number"
                          value={userData.mobileNo}
                          onChange={handleChange}
                          // required
                        />
                      </InputGroup>
                      {errorName == '"mobileNo"' ? (
                        <span>{errorDiv}</span>
                      ) : (
                        <span></span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6} md={12}>
                    <FormGroup>
                      <Label>Select role</Label>

                      <InputGroup className="input-group-alternative">
                        <Input
                          type={"select"}
                          name="role"
                          onChange={handleChange}
                          value={userData.role}
                        >
                          <option value={"admin"}>Admin</option>
                          <option value={"user"}> User</option>
                        </Input>
                      </InputGroup>

                      {errorName == '"role' ? (
                        <span>{errorDiv}</span>
                      ) : (
                        <span></span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Row>
                      <Label>Select gender</Label>
                      <Col md={6}>
                        <FormGroup>
                          {/* <InputGroup className=""> */}
                          <Label check className="">
                            Male
                          </Label>
                          <Input
                            name="gender"
                            value="male"
                            type="radio"
                            checked={userData.gender === "male"}
                            onChange={handleChange}
                            // required
                          />
                          {/* </InputGroup> */}
                          {errorName == '"gender"' ? (
                            <span>{errorDiv}</span>
                          ) : (
                            <span></span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          {/* <InputGroup className=""> */}
                          <Label check>Female</Label>
                          <Input
                            name="gender"
                            type="radio"
                            value="female"
                            checked={userData.gender === "female"}
                            onChange={handleChange}
                            // required
                          />
                          {/* </InputGroup> */}
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>BirthDate</Label>
                      <InputGroup className="input-group-alternative">
                        <Input
                          name="dob"
                          placeholder="date placeholder"
                          type="date"
                          value={moment(userData.dob)
                            .utc()
                            .format("YYYY-MM-DD")}
                          onChange={handleChange}
                          // required
                        />
                      </InputGroup>
                      {errorName == '"dob"' ? (
                        <span>{errorDiv}</span>
                      ) : (
                        <span></span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <div className="text-center mt-4">
                  <Button
                    color="warning"
                    className="me-5"
                    onClick={() => navigate("/admin/users")}
                  >
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col lg={2} md={1}></Col>
      </Row>
    </Container>
  );
};

export default EditUser;
