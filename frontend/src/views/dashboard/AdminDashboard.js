import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Col,
  Container,
  Row,
  Table,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import moment from "moment";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TostSucess } from "../../components/commonFunctions/Tost.js";

const AdminDashboard = () => {
  const [tourData, setTourData] = useState([]);
  const navigate = useNavigate();

  // Modal open state
  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState("");

  // Toggle for Modal
  const toggle = () => setModal(!modal);

  //notification toast
  // const notify = (message) => {
  //   toast.success(message, {
  //     position: toast.POSITION.TOP_RIGHT,
  //     autoClose: 2000,
  //   });
  // };

  //useEffect for fetching Tour data
  useEffect(() => {
    handleGetTour();
  }, []);

  //handleGetTour function
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

  // handleEdit
  const handleEdit = (id) => {
    console.log("id", id);
    navigate(`/admin/edittour/${id}`);
  };

  //handleDelete
  const handleDelete = (id) => {
    console.log("deleteID", id);
    setDelId(id);
    toggle();
  };

  //on delete function
  const onDelete = async () => {
    console.log("deleteID123", delId);
    let Id = delId;
    let url = `http://localhost:3001/tour/deleteTour/${Id}`;
    try {
      const response = await axios.get(url);
      console.log("delete res", response);
      toggle();
      handleGetTour();
      TostSucess("Tour is deleted successfully!");
    } catch (error) {
      console.log("error in catch", error);
    }
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
                  <>
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
                          alt="tour image"
                        />
                      </td>
                      <td>
                        {moment(data.StartDate).utc().format("DD-MM-YYYY")}
                      </td>
                      <td>{moment(data.EndDate).utc().format("DD-MM-YYYY")}</td>
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
                            // onClick={}
                          />
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle} className="text-danger">
                Delete Tour
              </ModalHeader>
              <ModalBody>Click delete to remove tour</ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                  Cancle
                </Button>
                <Button color="danger" onClick={() => onDelete()}>
                  Delete
                </Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;
