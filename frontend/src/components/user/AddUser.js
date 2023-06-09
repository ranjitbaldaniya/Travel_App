import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Row,
  Col,
  Container,
  Label,
  Card,
  CardBody,
} from "reactstrap";
import { TostSucess } from "../commonFunctions/Tost.js";
import ApiHeader from "../commonFunctions/ApiHeader.js";

const AddUser = () => {
  const [userData, setUserData] = useState({});
  console.log("userData", userData);
  const [errorName, setErrorName] = useState("");
  const [error, setError] = useState(null);
  // console.log("errorName", errorName);

  const navigate = useNavigate();

  //handlechange for handling events
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //handlesubmit for submiting form data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("check user data ", userData);
    handleAddUser(userData);
  };

  //handleAddUser function
  const handleAddUser = async (userData) => {
    let url = "http://localhost:3001/admin/user/adduser";
    let header = ApiHeader;
    try {
      const response = await axios.post(url, userData, header);
      console.log("res", response);
      setUserData({});

      TostSucess("User Added Successfully!!");
      navigate("/admin/users");
    } catch (error) {
      console.log("error in catch", error);
      setErrorName(error.response.data.error.split(" ")[0]);
      setError(error.response.data.error);
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
    <>
      <Container style={{ backgroundColor: "#eee", height: "100%" }}>
        <Row>
          <div className="text-center text-dark mb-4 mt-5">
            <h5>Add User</h5>
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

                  <Row>
                    <Col lg={6} md={12}>
                      <FormGroup>
                        <Label>Email</Label>

                        <InputGroup className="input-group-alternative mb-3">
                          <Input
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            onChange={handleChange}
                            // required
                          />
                        </InputGroup>
                        {errorName == '"email"' ? (
                          <span>{errorDiv}</span>
                        ) : (
                          <span></span>
                        )}
                      </FormGroup>
                    </Col>
                    <Col lg={6} md={12}>
                      <FormGroup>
                        <Label>Mobile number</Label>

                        <InputGroup className="input-group-alternative">
                          <Input
                            name="mobileNo"
                            placeholder="Enter your number"
                            type="number"
                            maxLength={"10"}
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
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormGroup>
                        <Label>Password</Label>

                        <InputGroup className="input-group-alternative">
                          <Input
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                            onChange={handleChange}
                            // required
                          />
                        </InputGroup>
                        {errorName == '"password"' ? (
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
                            type="select"
                            name="role"
                            defaultValue={"admin"}
                            onChange={handleChange}
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
                            min="1990-01-01"
                            max="2023-01-01"
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
                      type="button"
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
    </>
  );
};

export default AddUser;
