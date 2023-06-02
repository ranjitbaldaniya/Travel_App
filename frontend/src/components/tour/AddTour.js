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
  FormFeedback,
} from "reactstrap";
import { TostSucess } from "../commonFunctions/Tost.js";

const AddTour = () => {
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [price, setPrice] = useState("");
  const [packageDays, setPackageDays] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState("");

  // console.log("tourdata", startDate, endDate);
  const [errorName, setErrorName] = useState("");
  const [error, setError] = useState(null);
  // console.log("image", image);

  const navigate = useNavigate();

  //handlesubmit for submiting form data
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Discription", discription);
    formData.append("Price", price);
    formData.append("PackageDays", packageDays);
    formData.append("StartDate", startDate);
    formData.append("EndDate", endDate);
    formData.append("Image", image);

    console.log(formData);

    handleAddTour(formData);
  };

  //handleAddTour function
  const handleAddTour = async (formData) => {
    let url = "http://localhost:3001/tour/addtour";

    try {
      const response = await axios.post(url, formData);
      console.log("res", response);
      setName("");
      setDiscription("");
      setPrice("");
      setPackageDays("");
      setStartDate("");
      setEndDate("");
      setImage("");
      TostSucess("Tour Added Successfully!!");
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
                <Form
                  role="form"
                  onSubmit={handleSubmit}
                  method="post"
                  enctype="multipart/form-data"
                >
                  <FormGroup>
                    <Label>Tour Name</Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        name="Name"
                        placeholder="Enter tour name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => setDiscription(e.target.value)}
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
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
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
                            type="number"
                            onChange={(e) => setPackageDays(e.target.value)}

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
                            onChange={(e) => setStartDate(e.target.value)}
                            max={endDate}
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
                          {console.log(
                            "startDate >= endDate",
                            startDate < endDate
                          )}
                          <Input
                            name="EndDate"
                            placeholder="date placeholder"
                            type="date"
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate}
                            max="2025-01-01"
                            invalid={
                              startDate && endDate && startDate >= endDate
                            }
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
                    {startDate && endDate && startDate >= endDate ? (
                      <div className="text-center">
                        <i class="text-danger">
                          * Startdate must be less then Enddate
                        </i>
                      </div>
                    ) : null}
                  </Row>
                  <FormGroup>
                    <Label for="exampleCustomFileBrowser">Image</Label>
                    <Input
                      type="file"
                      id="exampleCustomFileBrowser"
                      name="Image"
                      accept=".png, .jpg, .jpeg"
                      label={"Choose an image file"}
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                      // onChange={handleChange}
                    />
                    {errorName == '"Image"' ? (
                      <span>{errorDiv}</span>
                    ) : (
                      <span></span>
                    )}
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      color="warning"
                      type="button"
                      className="me-5"
                      onClick={() => navigate("/admin")}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      disabled={startDate >= endDate}
                    >
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
