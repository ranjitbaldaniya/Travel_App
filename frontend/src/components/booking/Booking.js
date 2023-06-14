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
import { ToastContainer } from "react-toastify";

const Booking = () => {
  const [userData, setUserData] = useState("");
  console.log("userData", userData);
  const [tourData, setTourdata] = useState("");
  console.log("tourData", tourData);

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

  const sectionStyle = {
    width: "100%",
    height: "350px",
    backgroundImage: "url(" + `http://localhost:3001/${tourData.Image} ` + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <Container>
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

                <ToastContainer />
              </CardBody>
            </Card>
          </Col>
          <Col lg={6}>
          <Card>
          <CardTitle>
            <h4 className="text-center text-danger mt-2">Conform Your Booking</h4>
          </CardTitle>
              <CardBody>
              <form>
                <FormGroup>
                    <Label>Name</Label>
                    <Input/>
                </FormGroup>
              </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Booking;
