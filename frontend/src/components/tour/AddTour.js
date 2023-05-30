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

const AddTour = () => {
  const [tourData, setTourData] = useState({});
  console.log("tourdata" , tourData)
  const [errorName, setErrorName] = useState("");
  const [error, setError] = useState(null);
  console.log("errorName", errorName);

  const navigate = useNavigate();

  //handlechange for handling events
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  //handlesubmit for submiting form data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tourData);
    handleAddTour(tourData);
  };

  //handleRegister function
  const handleAddTour = async (tourData) => {
    let url = "http://localhost:3001/tour/addtour";
    try {
      const response = await axios.post(url, tourData);
      console.log("res", response);
      setTourData({});
      alert("User Registered Successfully!!");
      navigate("/admin");
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
            <h5>Add Tour</h5>
          </div>

          <Col lg={2} md={1}></Col>

          <Col lg={8} md={10}>
            <Card>
              <CardBody>
                <Form role="form" onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Tour Name</Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        name="Name"
                        placeholder="Enter tour name"
                        type="text"
                        onChange={handleChange}
                        // required
                      />
                    </InputGroup>
                    {/* {console.log("error" , errorName == '"firstName"')} */}
                    {errorName == '"Name"' ? (
                      <span>{errorDiv}</span>
                    ) : (
                      <span></span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label>Discription</Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        name="Discription"
                        placeholder="Enter tour discription"
                        type="text"
                        onChange={handleChange}
                        // required
                      />
                    </InputGroup>
                    {/* {console.log("error" , errorName == '"firstName"')} */}
                    {errorName == '"Discription"' ? (
                      <span>{errorDiv}</span>
                    ) : (
                      <span></span>
                    )}
                  </FormGroup>
                  <Row>
                    <Col lg={6} md={12}>
                      <FormGroup>
                        <Label>Price</Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <Input
                            name="Price"
                            placeholder="Enter tour price"
                            type="text"
                            onChange={handleChange}
                            // required
                          />
                        </InputGroup>
                        {/* {console.log("error" , errorName == '"firstName"')} */}
                        {errorName == '"Price"' ? (
                          <span>{errorDiv}</span>
                        ) : (
                          <span></span>
                        )}
                      </FormGroup>
                    </Col>
                    <Col lg={6} md={12}>
                      <FormGroup>
                        <Label>PackageDays</Label>
                        <InputGroup className="input-group-alternative mb-3">
                          <Input
                            name="PackageDays"
                            placeholder="Enter tour days"
                            type="text"
                            onChange={handleChange}
                            // required
                          />
                        </InputGroup>
                        {/* {console.log("error" , errorName == '"firstName"')} */}
                        {errorName == '"PackageDays"' ? (
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
                        <Label>StartDate</Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            name="StartDate"
                            placeholder="date placeholder"
                            type="date"
                            onChange={handleChange}
                            // required
                          />
                        </InputGroup>
                        {/* {console.log("error" , errorName == '"firstName"')} */}
                        {errorName == '"StartDate"' ? (
                          <span>{errorDiv}</span>
                        ) : (
                          <span></span>
                        )}
                      </FormGroup>
                    </Col>
                    <Col lg={6} md={12}>
                      <FormGroup>
                        <Label>EndDate</Label>
                        <InputGroup className="input-group-alternative">
                          <Input
                            name="EndDate"
                            placeholder="date placeholder"
                            type="date"
                            onChange={handleChange}
                            // required
                          />
                        </InputGroup>
                        {/* {console.log("error" , errorName == '"firstName"')} */}
                        {errorName == '"EndDate"' ? (
                          <span>{errorDiv}</span>
                        ) : (
                          <span></span>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label for="exampleFile">Image</Label>
                    <Input
                      type="file"
                      id="exampleCustomFileBrowser"
                      name="Image"
                      label={"Choose an image file"}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <div className="text-center">
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

export default AddTour;
