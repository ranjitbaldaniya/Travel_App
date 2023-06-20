import React from "react";
import { useState, useEffect } from "react";
import ApiHeader from "../commonFunctions/ApiHeader";
import axios from "axios";
import { Form, useNavigate, useParams } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  InputGroup,
  Input,
  CardTitle,
} from "reactstrap";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/commonFunctions/Loader.js";

const Booking = () => {
  const [userData, setUserData] = useState("");
  console.log("userData", userData);
  const [tourData, setTourdata] = useState("");
  console.log("tourData", tourData);

  const [booikgPlace, setBooikgPlace] = useState("");
  const [peopleQunatity, setPeopleQunatity] = useState("");
  const [paid, setPaid] = useState("");

  const [loading, setLoading] = useState(true);

  const userId = useParams();
  const navigate = useNavigate();
  //handleGetTour
  const handleGetTour = async () => {
    let url = `http://localhost:3001/tour/editTour/${userId.id}`;
    try {
      const response = await axios.get(url, userId);
      console.log("res", response.data);
      setTourdata(response.data);
      setLoading(true);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  //Get Current User Details
  const getCurrentUser = () => {
    const data = sessionStorage.getItem("user");
    // console.log("userData", JSON.parse(data));
    return JSON.parse(data);
  };

  //useEffect for getTours
  useEffect(() => {
    setLoading(false);
    handleGetTour();
    const data = getCurrentUser();
    setUserData(data);
  }, []);

  const TostSucess2 = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
    });
  };
  const sectionStyle = {
    width: "100%",
    height: "350px",
    backgroundImage: "url(" + `http://localhost:3001/${tourData.Image} ` + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");

    let bookingpayload = {
      booikgPlace,
      peopleQunatity,
      paid,
      userId: userData.id,
      tourId: tourData.id,
    };
    console.log("bookingpayload", bookingpayload);

    let url = "http://localhost:3001/booking/addbooking";
    let header = ApiHeader;

    try {
      const response = await axios.post(url, bookingpayload, header);
      console.log("response", response);
      setPaid("");
      setPeopleQunatity("");
      setBooikgPlace("");
      TostSucess2("Booking Submited Successfully!!");
      // TostSucess("Booking confirm successfully!");
      navigate(`/user`);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Container>
        {!loading ? (
          <>
            <Loader />
          </>
        ) : (
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <section
                    style={sectionStyle}
                    className="tour-section"
                  ></section>
                  <h2 className="text-center tour-name">
                    Tour Name:{" "}
                    <span className="text-danger">{tourData.Name}</span>
                  </h2>
                  <h6 className="tour-description-heading">Description:</h6>
                  <p className="tour-description">{tourData.Discription}</p>
                  <hr className="custom-hr" />
                  <div className="d-flex justify-content-between tour-info">
                    <h5 className="text-muted">
                      Price: <span className="text-dark">{tourData.Price}</span>
                    </h5>
                    <h5 className="text-muted">
                      Total Days:{" "}
                      <span className="text-dark">{tourData.PackageDays}</span>
                    </h5>
                  </div>
                  <hr className="custom-hr" />
                  <div className="d-flex justify-content-between tour-dates">
                    <h5 className="text-muted">
                      Tour Start From{" "}
                      <span className="text-dark">
                        {moment(tourData.startDate).utc().format("DD-MM-YYYY")}
                      </span>{" "}
                      To{" "}
                      <span className="text-dark">
                        {moment(tourData.endDate).utc().format("DD-MM-YYYY")}
                      </span>
                    </h5>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardTitle>
                  <h4 className="text-center text-danger mt-2">
                    Conform Your Booking
                  </h4>
                </CardTitle>
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label>PickupStand Name</Label>
                      <Input
                        type="text"
                        placeholder="Enter your pickupstand name"
                        onChange={(e) => setBooikgPlace(e.target.value)}
                      />
                    </FormGroup>
                    <Row>
                      <Col lg={6}>
                        <FormGroup>
                          <Label>Person or Group details</Label>
                          <Input
                            type="text"
                            placeholder="Enter person quantity"
                            onChange={(e) => setPeopleQunatity(e.target.value)}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg={6}>
                        <Row>
                          {" "}
                          <Row>
                            <Label>Payment Status</Label>
                            <Col md={6}>
                              <FormGroup>
                                <Label check className="">
                                  Paid{" "}
                                </Label>
                                <Input
                                  name="paid"
                                  value="true"
                                  type="radio"
                                  onChange={(e) => setPaid(e.target.value)}
                                  // required
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label check>Unpaid</Label>
                                <Input
                                  name="paid"
                                  type="radio"
                                  value="false"
                                  onChange={(e) => setPaid(e.target.value)}
                                  // required
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Row>
                      </Col>
                      <div className="d-flex justify-content-center">
                        {userData ? (
                          <>
                            <Button
                              color="warning"
                              className="me-3"
                              type="button"
                            >
                              Cancel
                            </Button>
                            <Button color="primary" type="submit">
                              Submit
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              color="warning"
                              className="me-3"
                              type="button"
                              onClick={(e) => navigate("/user")}
                            >
                              Back
                            </Button>
                            <h4 className="text-warning">
                              You are not Logged in!
                            </h4>
                          </>
                        )}
                      </div>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Booking;
