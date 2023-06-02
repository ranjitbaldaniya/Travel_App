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
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [price, setPrice] = useState("");
  const [packageDays, setPackageDays] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState("");

  const [errorName, setErrorName] = useState("");
  const [error, setError] = useState(null);

  const userId = useParams();

  const navigate = useNavigate();

  //handleGetTour
  const handleGetTour = async () => {
    let url = `http://localhost:3001/tour/editTour/${userId.id}`;
    try {
      const response = await axios.get(url, userId);
      console.log("res", response.data.Name);
      setName(response.data.Name);
      setDiscription(response.data.Discription);
      setPrice(response.data.Price);
      setPackageDays(response.data.PackageDays);
      setStartDate(response.data.StartDate);
      setEndDate(response.data.EndDate);
      setImage(response.data.Image);
      // setTour(response.data);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  //useEffect for getTours
  useEffect(() => {
    handleGetTour();
  }, []);

  //handlesubmit for submiting form data
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    // console.log("name", name);
    formData.append("Name", name);
    formData.append("Discription", discription);
    formData.append("Price", price);
    formData.append("PackageDays", packageDays);
    formData.append("StartDate", startDate);
    formData.append("EndDate", endDate);
    formData.append("Image", image);

    // console.log(formData);

    handleAddTour(formData);
  };

  //handleRegister function
  const handleAddTour = async (dataToUpdate) => {
    let url = `http://localhost:3001/tour/updateTour/${userId.id}`;
    console.log("updated tour dataaa", dataToUpdate);
    try {
      const response = await axios.post(url, dataToUpdate);
      console.log("res of update", response);
      setName("");
      setDiscription("");
      setPrice("");
      setPackageDays("");
      setStartDate("");
      setEndDate("");
      setImage("");
      TostSucess("Tour is Updated Successfully!");
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
                <Form
                  role="form"
                  method="post"
                  enctype="multipart/form-data"
                  onSubmit={handleSubmit}
                >
                  <FormGroup>
                    <Label>Tour Name</Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        name="Name"
                        placeholder="Enter tour name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // required
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
                        value={discription}
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
                            value={price}
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
                            value={packageDays}
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
                            value={moment(startDate).utc().format("YYYY-MM-DD")}
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
                          <Input
                            name="EndDate"
                            placeholder="date placeholder"
                            type="date"
                            value={moment(endDate).utc().format("YYYY-MM-DD")}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate}
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
                    <Label for="exampleFile">Image</Label>
                    <Input
                      type="file"
                      id="exampleCustomFileBrowser"
                      name="Image"
                      // value={`http://localhost:3001/`+image}
                      accept=".png, .jpg, .jpeg"
                      label={"Choose an image file"}
                      onChange={(e) => setImage(e.target.files[0])}
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
