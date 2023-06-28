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
import ApiHeader from "../commonFunctions/ApiHeader";

const UserBookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  console.log("currentUser", currentUser);
  const [listUsers, setListUsers] = useState([]);
  const [tourList, setTourList] = useState([]);
  //Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingPerPage] = useState(5);

  //get current tour
  const indexOfLastTour = currentPage * bookingPerPage;
  const indexOfFirstTour = indexOfLastTour - bookingPerPage;
  console.log(bookingData);
  const currentPageBooking = bookingData.slice(
    indexOfFirstTour,
    indexOfLastTour
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const navigate = useNavigate();

  //useEffect for fetching Tour data
  useEffect(() => {
    setLoading(false);
    const data = getCurrentUser();
    setCurrentUser(data);
    handleGetBookings();
    getUserListing();
    getTourListing();
  }, []);

  //Get Current User Details
  const getCurrentUser = () => {
    const data = sessionStorage.getItem("user");
    console.log("userData", JSON.parse(data));

    return JSON.parse(data);
  };

  //getUserListing
  const getUserListing = async () => {
    let url = "http://localhost:3001/admin/user/list";
    let header = ApiHeader;
    try {
      const response = await axios.get(url, header);
      console.log("res of userlisting", response.data);
      setListUsers(response.data);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  //getTourListing
  const getTourListing = async () => {
    let url = "http://localhost:3001/tour/viewalltour";
    let header = ApiHeader;
    try {
      const response = await axios.get(url, header);
      console.log("res of tourlist", response.data);
      setTourList(response.data);

      // let filteredTour = response.data.filter((e) => userId == e.id);
      // console.log("filteredTour", filteredTour[0]);

      // setTourName(filteredTour[0].Name);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  //handleGetBookings
  const handleGetBookings = async () => {
    let id = 2;
    console.log("1d", id);
    let url = `http://localhost:3001/booking/getBookingWithUserId/${id}`;
    try {
      const response = await axios.get(url, id);
      console.log("res", response.data.getBookingUser);
      setBookingData(response.data.getBookingUser);
      setLoading(true);
    } catch (error) {
      console.log("error in catch", error);
    }
  };
  let tname = tourList.filter((item) => item.id == 2).map((one) => one.Name);

  console.log("tname", tname);
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
                <h3 className=" text-primary">All Bookings</h3>
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
                    {/* <th>Payment Status</th> */}
                    <th>User name</th>
                    <th>Tour name</th>
                    {/* <th>Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {currentPageBooking.map((data, i) => (
                    <>
                      <tr key={i}>
                        <th scope="row">{data.id}</th>
                        <td>{data.booikgPlace}</td>
                        <td>{data.peopleQunatity}</td>
                        {/* <td>{data.paid}</td> */}
                        <td>
                          {listUsers
                            .filter((item) => item.id == data.userId)
                            .map((one) => one.firstName)}
                        </td>

                        <td>
                          {tourList
                            .filter((item) => item.id == data.tourId)
                            .map((one) => one.Name)}
                        </td>

                        {/* <td>
                          <div className="d-flex justify-content-around">
                            <FiEdit
                              className="text-success "
                              style={{ cursor: "pointer" }}
                              //   onClick={() => handleEditBooking(data.id)}
                            />

                            <MdDelete
                              className="text-danger"
                              style={{ cursor: "pointer" }}
                              //   onClick={() => handleDeleteBooking(data.id)}
                              // onClick={}
                            />
                          </div>
                        </td> */}
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
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

export default UserBookings;
