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
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TostSucess } from "../../components/commonFunctions/Tost.js";
import Pagination from "../../components/commonFunctions/Pagination.js";
import Loader from "../../components/commonFunctions/Loader.js";

const ViewBookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [token, setToken] = useState("");
  // console.log("token", token);
  //Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingPerPage] = useState(5);

  //get current tour
  const indexOfLastTour = currentPage * bookingPerPage;
  const indexOfFirstTour = indexOfLastTour - bookingPerPage;
  const currentPageBooking =
    search.length == 0
      ? bookingData.slice(indexOfFirstTour, indexOfLastTour)
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
    const gettoken = getToken();
    // console.log("datttaaa", gettoken);
    setToken(gettoken);
  }, []);

  useEffect(() => {
    setLoading(false);
    handleGetBookings();
  }, [token]);

  //handleGetBookings function
  const handleGetBookings = async () => {
    let url = "http://localhost:3001/booking/list";
    let header = { headers: { Authorization: `Bearer ${token}` } };
    // console.log("header", header);
    try {
      if (token !== "") {
        // console.log("if calling");
        const response = await axios.get(url, header);
        // console.log("res", response.data);
        setBookingData(response.data);
        setLoading(true);
      } else {
        setLoading(false);
        console.log("else calling");
      }
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  //Get Token
  const getToken = () => {
    const data1 = sessionStorage.getItem("access_token");
    // console.log("userData", JSON.parse(data));
    // console.log("data1", data1);
    return data1;
  };

  // handleEditBooking
  const handleEditBooking = (id) => {
    console.log("id", id);
    navigate(`/admin/editbookings/${id}`);
  };

  //handleDeleteBooking
  const handleDeleteBooking = (id) => {
    console.log("deleteID", id);
    setDelId(id);
    toggle();
  };

  //on delete function
  const onDelete = async () => {
    console.log("deleteID123", delId);
    let Id = delId;
    let header = { headers: { Authorization: `Bearer ${token}` } };

    let url = `http://localhost:3001/booking/delete/${Id}`;
    try {
      const response = await axios.get(url, header);
      console.log("delete res", response);
      toggle();
      handleGetBookings();
      TostSucess("Booking is deleted successfully!");
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (search !== "") {
      const filterData = bookingData.filter((item) => {
        const booikgPlace = Object.values(item.booikgPlace)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());

        const peopleQunatity = Object.values(item.peopleQunatity)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());

        return booikgPlace || peopleQunatity;
      });
      console.log("filtered data", filterData);
      setFilteredData(filterData);
    } else {
      setFilteredData(bookingData);
    }
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
                <h3 className=" text-primary">All Available Bookings</h3>
                <Button
                  color="primary"
                  className="btn me-5"
                  onClick={() => navigate("/admin/addbookings")}
                >
                  Add Booking
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
                    <th>Booking Place</th>
                    <th>Peoples In Tour</th>
                    <th>Payment Status</th>
                    <th>UserId</th>
                    <th>TourId</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageBooking.map((data, i) => (
                    <>
                      <tr key={i}>
                        <th scope="row">{data.id}</th>
                        <td>{data.booikgPlace}</td>
                        <td style={{ width: "300px" }}>
                          {data.peopleQunatity}
                        </td>
                        <td>{data.paid == true ? "True" : "False"}</td>
                        <td>{data.userId}</td>

                        <td>{data.tourId}</td>

                        <td>
                          <div className="d-flex justify-content-around">
                            <FiEdit
                              className="text-success "
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEditBooking(data.id)}
                            />

                            <MdDelete
                              className="text-danger"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDeleteBooking(data.id)}
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
                postPerPage={bookingPerPage}
                totalPost={bookingData.length}
                paginate={paginate}
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ViewBookings;
