import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import info1 from "../../assets/info1.png";
import info2 from "../../assets/info2.png";
import info3 from "../../assets/info3.png";
import { Button, Container, Row, Col, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DisplayTour = () => {
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
  };

  return (
    <Section id="recommend">
      <div className="title">
        <h2>Recommended Destinations</h2>
        <hr />
      </div>
      {/* <div className="packages">
        <ul>
          {packages.map((pkg, index) => {
            return (
              <li
                className={active === index + 1 ? "active" : ""}
                onClick={() => setActive(index + 1)}
              >
                {pkg}
              </li>
            );
          })}
        </ul>
      </div> */}
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
          {" "}
          <div className="destinations">
            {tourData.map((data) => {
              return (
                <div className="destination">
                  <img src={`http://localhost:3001/` + data.Image} alt="" />
                  <h3>{data.Name}</h3>
                  <p>{data.Discription}</p>
                  <div className="info">
                    <div className="services">
                      <img src={info1} alt="" />
                      <img src={info2} alt="" />
                      <img src={info3} alt="" />
                    </div>
                    <h4>Price {data.Price}/-</h4>
                  </div>
                  <div className="distance">
                    <span>1000 Kms</span>
                    <span>Days {data.PackageDays}</span>
                  </div>
                  <div className="text-center">
                    From {moment(data.StartDate).utc().format("DD-MM-YYYY")}{" "}
                    To {moment(data.EndDate).utc().format("DD-MM-YYYY")}
                  </div>
                  <div className="w-100">
                    {" "}
                    <Button
                      className="btn btn-sm w-100"
                      color="primary"
                      onClick={() => handleInquiry(data.id)}
                    >
                      Check Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Section>
  );
};

export default DisplayTour;
const Section = styled.section`
  padding: 2rem 0;
  .title {
    text-align: center;
  }
  .packages {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    ul {
      display: flex;
      list-style-type: none;
      width: max-content;
      li {
        padding: 1rem 2rem;
        border-bottom: 0.1rem solid black;
      }
      .active {
        border-bottom: 0.5rem solid #8338ec;
      }
    }
  }
  .destinations {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding: 0 3rem;
    .destination {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background-color: #8338ec14;
      border-radius: 1rem;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      img {
        width: 100%;
      }
      .info {
        display: flex;
        align-items: center;
        .services {
          display: flex;
          gap: 0.3rem;
          img {
            border-radius: 1rem;
            background-color: #4d2ddb84;
            width: 2rem;
            /* padding: 1rem; */
            padding: 0.3rem 0.4rem;
          }
        }
        display: flex;
        justify-content: space-between;
      }
      .distance {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .packages {
      ul {
        li {
          padding: 0 0.5rem;
          font-size: 2vh;
          padding-bottom: 1rem;
        }
        .active {
          border-bottom-width: 0.3rem;
        }
      }
    }
    .destinations {
      grid-template-columns: 1fr;
      padding: 0;
    }
  }
`;
