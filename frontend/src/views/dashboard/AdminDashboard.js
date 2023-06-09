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
  Input,
} from "reactstrap";
import moment from "moment";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TostSucess } from "../../components/commonFunctions/Tost.js";
import Pagination from "../../components/commonFunctions/Pagination.js";
import Loader from "../../components/commonFunctions/Loader.js";

const AdminDashboard = () => {
  const [tourData, setTourData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  //Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [tourPerPage] = useState(5);

  //get current tour
  const indexOfLastTour = currentPage * tourPerPage;
  const indexOfFirstTour = indexOfLastTour - tourPerPage;
  const currentTour =
    search.length == 0
      ? tourData.slice(indexOfFirstTour, indexOfLastTour)
      : filteredData.slice(indexOfFirstTour, indexOfLastTour);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Modal open state
  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState("");

  const navigate = useNavigate();
  // Toggle for Modal
  const toggle = () => setModal(!modal);

  //useEffect for fetching Tour data
  useEffect(() => {
    setLoading(false);
    handleGetTour();
  }, []);

  //handleGetTour function
  const handleGetTour = async () => {
    let url = "http://localhost:3001/tour/viewalltour";
    try {
      const response = await axios.get(url);
      // console.log("res", response.data);
      setTourData(response.data);
      setLoading(true);
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
      // console.log("delete res", response);
      toggle();
      handleGetTour();
      TostSucess("Tour is deleted successfully!");
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (search !== "") {
      const filterData = tourData.filter((item) => {
        const Name = Object.values(item.Name)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());

        const Discription = Object.values(item.Discription)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());

        return Name || Discription;
      });
      console.log("filtered data", filterData);
      setFilteredData(filterData);
    } else {
      setFilteredData(tourData);
    }
  };

  // const StartDate = moment(tourData.StartDate).utc().format('DD-MM-YYYY')
  // console.log(StartDate)
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
            <Col lg={3}></Col>
            <Col md={12} lg={6}>
              <div className="d-flex justify-content-end mb-3 mt-3">
                <Input
                  type="text"
                  placeholder="Search here..."
                  onChange={handleSearch}
                />
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
                  {currentTour.map((data, i) => (
                    <>
                      <tr key={i}>
                        <th scope="row">{data.id}</th>
                        <td>{data.Name}</td>
                        <td style={{ width: "300px" }}>{data.Discription}</td>
                        <td>{data.PackageDays}</td>
                        <td>{data.Price}</td>
                        <td>
                          {/* {console.warn("data", data)} */}
                          {/* src="../../publicC:\fakepath\Taj-Mahal.jpg" */}
                          <img
                            src={`http://localhost:3001/` + data.Image}
                            className=""
                            height={100}
                            width={150}
                            alt="tour image"
                          />
                        </td>
                        <td>
                          {moment(data.StartDate).utc().format("DD-MM-YYYY")}
                        </td>
                        <td>
                          {moment(data.EndDate).utc().format("DD-MM-YYYY")}
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
          <Row>
            <Col md={12} className="d-flex justify-content-center">
              <Pagination
                postPerPage={tourPerPage}
                totalPost={tourData.length}
                paginate={paginate}
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default AdminDashboard;
