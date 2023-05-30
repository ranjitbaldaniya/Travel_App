import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Row,
  CardBody,
  CardImg,
  Table,
  Button,
} from "reactstrap";
import moment from "moment";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [tourData, setTourData] = useState([]);
  const navigate = useNavigate();

  //useEffect for fetching Tour data
  useEffect(() => {
    handleGetTour();
  }, []);

  //handleLogin function
  const handleGetTour = async () => {
    let url = "http://localhost:3001/tour/viewalltour";
    try {
      const response = await axios.get(url);
      // console.log("res", response.data);
      setTourData(response.data);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  // handleEdit
  const handleEdit = (id) => {
    console.log("id", id);
    navigate(`/admin/edittour/${id}`);
  };

  //handleDelete
  const handleDelete = (id) => {
    console.log("deleteID", id);
  };

  // const StartDate = moment(tourData.StartDate).utc().format('DD-MM-YYYY')
  // console.log(StartDate)
  return (
    <>
      <Container>
        <Row>
        
          <Col md={12} lg={12}>
            <div className="d-flex justify-content-between mb-3 mt-3">
              <h3 className=" text-primary">All Available Tours</h3>
              <Button
                color="primary"
                className="btn me-5"
                onClick={() => navigate("/admin/addtour")}
              >
                AddTour
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          {/* {tourData.map((data, i) => (
            <Col lg="6" xl="3" md="4" className="mb-4">
              <Card className="mb-4 mb-xl-0">
                <CardBody>
                  <img src={data.Image} height={150} width={200} />
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
          ))} */}

          <Col md={12} lg={12}>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Discription</th>
                  <th>Pack-Days</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tourData.map((data, i) => (
                  <tr key={i}>
                    <th scope="row">{data.id}</th>
                    <td>{data.Name}</td>
                    <td style={{ width: "300px" }}>{data.Discription}</td>
                    <td>{data.PackageDays}</td>
                    <td>{data.Price}</td>
                    <td>
                      <img
                        src={data.Image}
                        className=""
                        height={100}
                        width={150}
                      />
                    </td>
                    <td>
                      {moment(tourData.StartDate).utc().format("DD-MM-YYYY")}
                    </td>
                    <td>
                      {moment(tourData.EndDate).utc().format("DD-MM-YYYY")}
                    </td>
                    <td>
                      <div className="d-flex justify-content-around">
                        <FiEdit
                          className="text-success "
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEdit(data.id)}
                        />

                        <MdDelete
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(data.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;
