import React, { useEffect, useState } from "react";
import { Card, CardTitle, Col, Container, Row, CardBody } from "reactstrap";
import axios from "axios";

const Home = () => {
  const [tourData, setTourData] = useState([]);

  //useEffect for fetching Tour data
  useEffect(() => {
    handleGetTour();
  }, []);

  //handleLogin function
  const handleGetTour = async () => {
    let url = "http://localhost:3001/tour/viewalltour";
    try {
      const response = await axios.get(url);
      console.log("res", response.data);
      setTourData(response.data);
    } catch (error) {
      console.log("error in catch", error);
    }
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
        <Row>
          {tourData.map((data, i) => (
            <Col lg="6" xl="3" className="mb-4">
              <Card className="mb-4 mb-xl-0">
                <CardBody>
                  <img src={`http://localhost:3001/` + data.Image} height={150} width={200} alt="tour image" />
                  <Row>
                    <div className="col">
                      <CardTitle tag="h5" className=" text-muted mb-0">
                        <span className="h2 font-weight-bold mb-0">
                          {data.Name}
                        </span>
                      </CardTitle>
                      Price: {data.Price} /-
                    </div>
                    <Col className="col-auto">
                      <div className=" bg-warning text-white rounded-circle shadow">
                        <h4 className="text-success">{data.PackageDays}</h4>{" "}
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-wrap">{data.Discription}</span>
                  </p>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
