import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Input,
} from "reactstrap";
import moment from "moment";
import { TostSucess } from "../../components/commonFunctions/Tost.js";
import axios from "axios";
import ApiHeader from "../commonFunctions/ApiHeader";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Pagination from "../../components/commonFunctions/Pagination.js";
import Loader from "../../components/commonFunctions/Loader.js";

const UserListing = () => {
  const [listUsers, setListUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal open state
  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState("");
  //Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(5);

  //get current tour
  const indexOfLastTour = currentPage * userPerPage;
  const indexOfFirstTour = indexOfLastTour - userPerPage;
  const currentTour =
    // search.length == 0
    listUsers.slice(indexOfFirstTour, indexOfLastTour);
  // : filteredData.slice(indexOfFirstTour, indexOfLastTour);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const navigate = useNavigate();

  const toggle = () => setModal(!modal);

  //useEffect for fetching Tour data
  useEffect(() => {
    setLoading(false);
    handleListUser();
  }, []);

  //handleListUser function
  const handleListUser = async () => {
    let url = `http://localhost:3001/admin/user/list?search`;

    let header = ApiHeader;
    try {
      const response = await axios.get(url, header);
      console.log("res", response.data);
      setListUsers(response.data);
      setLoading(true);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  //handleEdit user
  const handleEdit = (id) => {
    console.log("id", id);
    navigate(`/admin/edituser/${id}`);
  };

  //handleDelete
  const handleDelete = (id) => {
    console.log("deleteID", id);
    setDelId(id);
    toggle();
    handleListUser();
  };

  //on delete function
  const onDelete = async () => {
    // console.log("deleteID123", delId);
    let Id = delId;
    let url = `http://localhost:3001/tour/deleteTour/${Id}`;
    try {
      const response = await axios.get(url);
      console.log("delete res", response);
      toggle();
      handleListUser();
      TostSucess("Tour is deleted successfully!");
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  const handleSearch = async () => {
    let url = `http://localhost:3001/admin/user/list?search=${search}`;
    const header = ApiHeader;
    try {
      const response = await axios.get(url, header);
      // console.log("res123", response.data);
      setListUsers(response.data);
      // setListUsers(response.data);
      // setLoading(true);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  const handleClear = () => {
    setSearch("");
    handleListUser();
  };
  return (
    <>
      {!loading ? (
        <>
          <Loader />
        </>
      ) : (
        <Container>
          <Row>
            <Col md={12} lg={12}>
              <div className="d-flex justify-content-between mb-3 mt-3">
                <h3 className=" text-primary">All Available User</h3>
                <Button
                  color="primary"
                  className="btn me-5"
                  onClick={() => navigate("/admin/adduser")}
                >
                  Add User
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={3}></Col>
            <Col md={12} lg={6}>
              <div className="d-flex justify-content-end mb-3 mt-3">
                <Input
                  type="text"
                  placeholder="Search here..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="d-flex">
                  <Button
                    color="primary"
                    className="me-3 ms-3"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>

                  <Button color="warning" onClick={handleClear}>
                    Clear
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={12}>
              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Firstname</th>
                    <th>LastName</th>
                    <th>Email</th>
                    {/* <th>Password</th> */}
                    <th>Mobile No</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTour.map((data, i) => (
                    <>
                      <tr key={i}>
                        <th scope="row">{data.id}</th>
                        <td>{data.firstName}</td>
                        <td>{data.lastName}</td>
                        <td>{data.email}</td>
                        {/* <td >{data.password}</td> */}
                        <td>{data.mobileNo}</td>
                        <td>{data.gender}</td>
                        <td> {moment(data.dob).utc().format("DD-MM-YYYY")}</td>
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
            </Col>
          </Row>
          <Row>
            <Col md={12} className="d-flex justify-content-center">
              <Pagination
                postPerPage={userPerPage}
                totalPost={listUsers.length}
                paginate={paginate}
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default UserListing;
