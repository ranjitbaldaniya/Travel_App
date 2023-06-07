import React, { useEffect, useState } from "react";
import {
  Card,
  CardTitle,
  Col,
  Container,
  Row,
  CardBody,
  Button,
  CardSubtitle,
  CardText,
} from "reactstrap";
import axios from "axios";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";

const Home = () => {
  const [tourData, setTourData] = useState([]);
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //useEffect for fetching Tour data
  useEffect(() => {
    setLoading(false);
    handleGetTour();
    handleGetAdminDetails();
    const data = handleGetAdminDetails();
    setUserData(data);
    
  }, [sessionStorage.getItem("user")]);

  //handleLogin function
  const handleGetTour = async () => {
    let url = "http://localhost:3001/tour/viewalltour";
    try {
      const response = await axios.get(url);
      console.log("res", response.data);
      setTourData(response.data);
      setLoading(true);
    } catch (error) {
      console.log("error in catch", error);
    }
  };
  //handle for getting credencials
  const handleGetAdminDetails = () => {
    const userDetails = sessionStorage.getItem("user");
    // console.log("123" , JSON.parse(userDetails));
    return JSON.parse(userDetails);
  };
  //handleInquiry
  const handleInquiry = (id) => {
    // console.log("id", id);
    navigate(`/user/tour/${id}`);
    // if (userData) {
    // } else {
    //   navigate("/login");
    // }
  };
  return (
    <>
      <Container fluid className="pb-5 bg-dark">
        <div className="header-body text-center mb-3">
          <Row className="justify-content-center">
            <Col lg="5" md="6">
              <h1 className="text-white">Find Tour & Travel </h1>
              <p className="text-lead text-white">
                Life is either a daring adventure or nothing.
              </p>
            </Col>
          </Row>
        </div>

        <Row className="justify-content-center mb-4 text-center">
          <Col lg="12" md="7">
            <div className="bg-secondary border  rounded">
              <h3 className="display-3 mb-1">Highlighted Events</h3>
              <p className="mb-2 text-default">
                <strong>Recommended camps by our Instructors</strong>
              </p>
            </div>
          </Col>
        </Row>
        {/* {console.log("1", loading)} */}
        {!loading ? (
          <>
            <Container>
              <Row>
                <Col className="d-flex justify-content-center" lg={12}>
                  <h4 className="text-secondary">Loading...</h4>
                </Col>
                <Col className="d-flex justify-content-center" lg={12}>
                  <Spinner
                    color="secondary"
                    style={{ width: "2rem", height: "2rem" }}
                    children={false}
                  />
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <>
            <Row className="">
              {tourData.map((data, i) => (
                <Col
                  lg="4"
                  xl="3"
                  md={3}
                  className="mb-4 d-flex justisy-content-center"
                >
                  <Card
                    style={{
                      width: "18rem",
                    }}
                    className="shadow"
                  >
                    <img
                      alt="Sample"
                      className=""
                      height={220}
                      src={`http://localhost:3001/` + data.Image}
                    />
                    <CardBody>
                      <CardTitle tag="h5">{data.Name}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Price: {data.Price}
                      </CardSubtitle>
                      <CardText>{data.Discription}</CardText>
                      <div className="d-flex justify-content-between">
                        <CardSubtitle>
                          Package <br />
                          Days: {data.PackageDays}
                        </CardSubtitle>
                        <CardText>
                          From{" "}
                          {moment(data.StartDate).utc().format("DD-MM-YYYY")}{" "}
                          <br />
                          To {moment(data.EndDate).utc().format("DD-MM-YYYY")}
                        </CardText>
                      </div>
                      <div className="w-100">
                        {" "}
                        <Button
                          className="btn btn-sm w-100"
                          color="info"
                          onClick={() => handleInquiry(data.id)}
                        >
                          Check Details
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
