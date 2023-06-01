/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
// import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Row,
  Col,
  Container,
} from "reactstrap";

const Login = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  // const [errorName, setErrorName] = useState("");
  const [token, setToken] = useState();
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  //handlechange for handling events
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //handlesybmit for submiting form data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    handleLogin(userData);
  };

  //handleLogin function
  const handleLogin = async () => {
    let url = "http://localhost:3001/admin/profile/login";
    try {
      const response = await axios.post(url, userData);
      console.log("res", response);
      let token = response.data.access_token;
      if (!token) {
        alert("Unable to login. Please try after some time.");
        return;
      }
      let user = response.data.user;
      // console.log("tokentoken", token);
      setToken(token);
      sessionStorage.clear();
      sessionStorage.setItem("access_token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setUserData({});
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.log("error in catch", error);
      // setErrorName(error.response.data.split(" ")[0]);
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
      <Container fluid className="bg-dark pb-5 ">
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
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-light mb-4">
                  <h5> Sign in with credentials</h5>
                </div>
                <Form onSubmit={handleSubmit}>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <Input
                        placeholder="Enter your email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>
                    {/* {errorName == '"email"' ? (
                      <span>{errorDiv}</span>
                    ) : (
                      <span></span>
                    )} */}
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <Input
                        placeholder="Enter your password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>
                    {/* {errorName == '"password"' ? (
                      <span>{errorDiv}</span>
                    ) : (
                      <span></span>
                    )} */}
                  </FormGroup>

                  <div className="text-center">
                    {errorDiv}
                    <Button className="my-3" color="primary" type="submit">
                      Sign in
                    </Button>
                  </div>
                  <div className="text-center mt-2">
                    <Link
                      className="text-light"
                      to="/register"
                      // onClick={(e) => e.preventDefault()}
                    >
                      <small>
                        Don't have accout? Click here to{" "}
                        <span className="text-warning">Create new account</span>
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

export default Login;
