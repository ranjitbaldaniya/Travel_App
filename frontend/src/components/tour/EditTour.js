import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import moment from "moment";
import { TostSucess } from "../commonFunctions/Tost.js";

const EditTour = () => {
  const [tour, setTour] = useState({});
  // const [tourData, setTourData] = useState({});
  const [errorName, setErrorName] = useState("");
  const [error, setError] = useState(null);

  // console.log("errorName", errorName);

  const userId = useParams();

  console.log("single tour Data", tour);

  const navigate = useNavigate();

  //handleGetTour
  const handleGetTour = async () => {
    let url = `http://localhost:3001/tour/editTour/${userId.id}`;
    try {
      const response = await axios.get(url, userId);
      console.log("res", response);
      setTour(response.data);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  //useEffect for getTours
  useEffect(() => {
    handleGetTour();
  }, []);

  //handlechange for handling events
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTour({ ...tour, [name]: value });
  };

  //handlesubmit for submiting form data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("123", tour);

    const dataToUpdate = {
      Name: tour.Name,
      Discription: tour.Discription,
      Image: tour.Image,
      Price: tour.Price,
      PackageDays: tour.PackageDays,
      StartDate: tour.StartDate,
      EndDate: tour.EndDate,
      status: true,
      // createBy: null,
      // updateBy: null,
    };
    handleAddTour(dataToUpdate);
  };

  //handleRegister function
  const handleAddTour = async (dataToUpdate) => {
    let url = `http://localhost:3001/tour/updateTour/${userId.id}`;
    console.log("esited tour dataaa", dataToUpdate);
    try {
      const response = await axios.post(url, dataToUpdate);
      console.log("res of update", response);
      setTour({});
      TostSucess("Tour is edited successfully!");
      navigate("/admin");
      // alert("Tour Updated Successfully!!");
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
            <h5>Edit Tour</h5>
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
                        value={tour.Name}
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
                        value={tour.Discription}
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
                            value={tour.Price}
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
                            value={tour.PackageDays}
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
                            value={moment(tour.StartDate)
                              .utc()
                              .format("YYYY-MM-DD")}
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
                            value={moment(tour.EndDate)
                              .utc()
                              .format("YYYY-MM-DD")}
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
                      // value={tour.Image}
                      label={"Choose an image file"}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <div className="text-center">
                  <Button
                    color="warning"
                    className="me-5"
                    onClick={() => navigate("/admin")}
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

export default EditTour;
