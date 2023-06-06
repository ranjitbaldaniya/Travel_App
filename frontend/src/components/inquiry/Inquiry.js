import React, { useEffect, useState } from "react";
import axios from "axios";
import ApiHeader from "../commonFunctions/ApiHeader";
import {
  Container,
  Button,
  Row,
  Col,
  Table,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Pagination from "../../components/commonFunctions/Pagination.js";
import { TostSucess } from "../commonFunctions/Tost";

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(10);
  // Modal open state
  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState("");
  //get current tour
  const indexOfLastInquiries = currentPage * userPerPage;
  const indexOfFirstInquiries = indexOfLastInquiries - userPerPage;
  const currentPageInquiries = inquiries.slice(
    indexOfFirstInquiries,
    indexOfLastInquiries
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const toggle = () => setModal(!modal);
  const navigate = useNavigate();
  //handleGetInquiries
  const handleGetInquiries = async () => {
    let header = ApiHeader;
    let url = "http://localhost:3001/inquiry/list";
    try {
      const response = await axios.get(url, header);
      // console.log("response", response);
      setInquiries(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  //useeffect for fetching all inquiries
  useEffect(() => {
    handleGetInquiries();
  }, []);

  //handleEdit
  const handleEdit = (id) => {
    console.log("id", id);
    navigate(`/admin/editinquiries/${id}`);
  };

  //handleDelete
  const handleDelete = (id) => {
    setDelId(id);
    toggle();
    handleGetInquiries();
  };

  //on delete function
  const onDelete = async () => {
    console.log("deleteID123", delId);
    let Id = delId;
    let header = ApiHeader;
    let url = `http://localhost:3001/inquiry/delete/${Id}`;
    try {
      const response = await axios.get(url, header);
      console.log("delete res", response);
      toggle();
      handleGetInquiries();
      TostSucess("Inquirie is deleted successfully!");
    } catch (error) {
      console.log("error in catch", error);
    }
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={12} lg={12}>
            <div className="d-flex justify-content-between mb-3 mt-3">
              <h3 className=" text-primary">All Available Inquiries</h3>
              <Button
                color="primary"
                className="btn me-5"
                onClick={() => navigate("/admin/addinquiries")}
              >
                Add Inquiry
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
                  <th>Title</th>
                  <th>Discription</th>
                  <th>UserId</th>
                  <th>TourId</th>
                  <th>CreatedAt</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPageInquiries.map((data, i) => (
                  <>
                    <tr key={i}>
                      <th scope="row">{data.id}</th>
                      <td>{data.title}</td>
                      <td>{data.discription}</td>
                      <td>{data.userId}</td>
                      <td>{data.tourId}</td>

                      <td>
                        {moment(data.createdAt).utc().format("DD-MM-YYYY")}
                      </td>
                      {/* <td>{data.createdBy}</td> */}
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
                  </>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} className="text-danger">
            Delete User
          </ModalHeader>
          <ModalBody>Click delete to remove User</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancle
            </Button>
            <Button color="danger" onClick={() => onDelete()}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col md={12} className="d-flex justify-content-center">
            <Pagination
              postPerPage={userPerPage}
              totalPost={inquiries.length}
              paginate={paginate}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Inquiry;