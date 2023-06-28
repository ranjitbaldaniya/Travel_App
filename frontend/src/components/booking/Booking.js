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
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/commonFunctions/Loader.js";

const Booking = () => {
  const [userData, setUserData] = useState("");
  // console.log("userData", userData);
  const [tourData, setTourdata] = useState("");
  // console.log("tourData", tourData);

  const [booikgPlace, setBooikgPlace] = useState("");
  const [peopleQunatity, setPeopleQunatity] = useState("");
  // const [paid, setPaid] = useState("");

  const [loading, setLoading] = useState(true);

  const userId = useParams();
  const navigate = useNavigate();
  //handleGetTour
  const handleGetTour = async () => {
    let url = `http://localhost:3001/tour/editTour/${userId.id}`;
    try {
      const response = await axios.get(url, userId);
      // console.log("res", response.data);
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
    height: "300px",
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
      // paid,
      userId: userData.id,
      tourId: tourData.id,
    };
    console.log("bookingpayload", bookingpayload);

    let url = "http://localhost:3001/booking/addbooking";
    let header = ApiHeader;
    console.log("apiheader", header);

    try {
      const response = await axios.post(url, bookingpayload, header);
      console.log("response", response);

      let bookingId = response.data.createBooking.id;
      console.log("bookingId", bookingId);

      setPeopleQunatity("");
      setBooikgPlace("");
      TostSucess2("Booking Submited Successfully!!");
      navigate(`/user/payment/${bookingId}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Container className="mt-5 mb-5">
        {!loading ? (
          <>
            <Loader />
          </>
        ) : (
          <Card>
            <Row>
              {/* <Col lg={3}></Col> */}
              <Col lg={5}>
                {/* <Card> */}
                <CardBody>
                <section
                  style={sectionStyle}
                  className="tour-section"
                ></section>
                <h2 className="text-center tour-name">
                  Tour Name:{" "}
                  <span className="text-danger">{tourData.Name}</span>
                </h2>
                {/* <h6 className="tour-description-heading">Description:</h6>
                  <p className="tour-description">{tourData.Discription}</p> */}
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
                {/* <hr className="custom-hr" /> */}
                {/* <div className="d-flex justify-content-between tour-dates">
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
                  </div> */}
                </CardBody>
                {/* </Card> */}
              </Col>
              <Col lg={6}>
              <CardBody>

                {/* <Card> */}
                {/* <CardTitle> */}
                <h4 className="text-center text-danger mt-2">
                  Conform Your Booking for{" "}
                  <span className="text-danger">{tourData.Name}</span>
                </h4>
                {/* </CardTitle> */}
                {/* <CardBody> */}
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Pickup Point Name</Label>
                    <Input
                      type="text"
                      required
                      placeholder="Enter your pickuppoit name"
                      onChange={(e) => setBooikgPlace(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Person or Group details</Label>
                    <Input
                      type="number"
                      placeholder="Enter person quantity"
                      required
                      onChange={(e) => setPeopleQunatity(e.target.value)}
                    />
                  </FormGroup>
                  <hr className="custom-hr" />

                  <div className="mb-3">
                    {peopleQunatity == "" ? (
                      <h5>
                        Amount to be paid :{" "}
                        <span className="text-danger">{tourData.Price}</span>
                      </h5>
                    ) : (
                      <>
                        <h5>
                          Amount to be paid :{" "}
                          <span className="text-danger">
                            {tourData.Price} X {peopleQunatity}
                          </span>
                        </h5>
                      </>
                    )}
                    <hr className="custom-hr" />

                    <h5>
                      Total amount to be paid :
                      {peopleQunatity == "" ? (
                        <span className="text-danger">{tourData.Price} /-</span>
                      ) : (
                        <span className="text-danger">
                          {tourData.Price * peopleQunatity} /-
                        </span>
                      )}
                    </h5>
                  </div>
                  <hr className="custom-hr" />

                  <div className="d-flex justify-content-center">
                    {userData ? (
                      <>
                        <Button
                          color="warning"
                          className="me-3"
                          type="button"
                          // onClick={checkOut}
                          // onClick={handlePayhere}
                        >
                          Cancel
                        </Button>

                        <Button color="primary" type="submit">
                          Pay now
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
                        <h4 className="text-warning">You are not Logged in!</h4>
                      </>
                    )}
                  </div>
                </form>
                </CardBody>
                {/* </Card> */}
              </Col>
            </Row>
          </Card>
        )}
      </Container>
    </>
  );
};

export default Booking;
