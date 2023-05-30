import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
  Label,
} from "reactstrap";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({});
  const [errorName, setErrorName] = useState("");
  const [error, setError] = useState(null);
  console.log("errorName", errorName);

  const navigate = useNavigate()

  //handlechange for handling events
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //handlesubmit for submiting form data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);

    handleRegister(userData);

    // if (hasError) {
    //   alert(error);
    // } else {

    // }
  };

  //handleRegister function
  const handleRegister = async (userData) => {
    let url = "http://localhost:3001/admin/profile/register";
    try {
      const response = await axios.post(url, userData);
      console.log("res", response);
      setUserData({});
      alert("User Registered Successfully!!");
      navigate("/login");
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
      <Container fluid className="bg-dark pb-5">
        <div className="header-body text-center mb-3">
          <Row className="justify-content-center">
            <Col lg="5" md="6">
              <h1 className="text-white">Welcome!</h1>
              <p className="text-lead text-light">
                Use these awesome forms to login or create new account in your
                project for free.
              </p>
            </Col>
          </Row>
        </div>
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-light mb-4">
                  <h5>Sign up with credentials</h5>
                </div>
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
                  <FormGroup>
                    <Label>Conform Password</Label>

                    <InputGroup className="input-group-alternative">
                      <Input
                        name="repeatPassword"
                        placeholder="Confirm Your password"
                        type="password"
                        onChange={handleChange}
                        // required
                      />
                    </InputGroup>
                    {errorName == '"Confirm' ? (
                      <span>{errorDiv}</span>
                    ) : (
                      <span></span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label>Mobile Number</Label>

                    <InputGroup className="input-group-alternative">
                      <Input
                        name="mobileNo"
                        placeholder="Enter your number"
                        type="number"
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

                  <Row>
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
                  <FormGroup>
                    <Label>BirthDate</Label>
                    <InputGroup className="input-group-alternative">
                      <Input
                        name="dob"
                        placeholder="date placeholder"
                        type="date"
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
                  {/* <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div> */}
                  <Row className="my-4">
                    <Col xs="12">
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="customCheckRegister"
                          type="checkbox"
                          // onChange={e => setCheck(e.target.value)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheckRegister"
                        >
                          <span className="text-light">
                            I agree with the Privacy Policy
                          </span>
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center">
                    {/* {errorDiv} */}
                    <Button className="mt-1" type="submit" color="primary">
                      Create account
                    </Button>
                  </div>
                  <div className="text-center mt-2">
                    <Link
                      className="text-light"
                      to="/login"
                      // onClick={(e) => e.preventDefault()}
                    >
                      <small>
                        Alredy Registered!! Click here to{" "}
                        <span className="text-warning">Login</span>
                      </small>
                    </Link>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
