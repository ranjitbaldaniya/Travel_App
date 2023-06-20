import React, { useState, useEffect } from "react";
import ApiHeader from "../commonFunctions/ApiHeader";
import axios from "axios";
import {
  Col,
  Row,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  Button,
} from "reactstrap";
import Select from "react-select";
import { TostSucess } from "../commonFunctions/Tost";
import { useNavigate, useParams } from "react-router-dom";

const EditBookings = () => {
  const [listUsers, setListUsers] = useState([]);
  const [tourList, setTourList] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [clintId, setClintId] = useState("");
  const [clintName, setClintName] = useState("");
  // console.log("clintName", clintName);
  const [tourId, setTourId] = useState("");
  const [tourName, setTourName] = useState("");

  const [booikgPlace, setBooikgPlace] = useState("");
  const [peopleQunatity, setPeopleQunatity] = useState("");
  const [paid, setPaid] = useState("");

  const Params = useParams();
  const bookingId = Params.id;
  const navigate = useNavigate();

  //handleGetInquiries
  const handleGetInquiries = async () => {
    let url = `http://localhost:3001/booking/edit/${bookingId}`;
    let header = ApiHeader;
    try {
      const response = await axios.get(url, header);
      console.log("res123", response.data);
      setClintId(response.data.userId);
      setTourId(response.data.tourId);
      setBooikgPlace(response.data.booikgPlace);
      setPeopleQunatity(response.data.peopleQunatity);
      setPaid(response.data.paid);
    } catch (error) {
      console.log("error in catch", error);
    }
  };
  //useEffect for fetching Tour data
  useEffect(() => {
    handleGetInquiries();
    handleListUser();
    handleTourList();
    const data = getCurrentUser();
    setCurrentUser(data);
  }, []);

  //handleListUser function
  const handleListUser = async () => {
    let url = "http://localhost:3001/admin/user/list";
    let header = ApiHeader;
    try {
      const response = await axios.get(url, header);
      // console.log("res", response.data);
      setListUsers(response.data);
    } catch (error) {
      console.log("error in catch", error);
    }
  };
  //handleTourList function
  const handleTourList = async () => {
    let url = "http://localhost:3001/tour/viewalltour";
    let header = ApiHeader;
    try {
      const response = await axios.get(url, header);
      console.log("res", response.data);
      setTourList(response.data);

      let filteredTour = response.data.filter((e) => bookingId == e.id);
      // console.log("filteredTour", filteredTour[0]);

      setTourName(filteredTour[0].Name);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  //Get Current User Details
  const getCurrentUser = () => {
    const data = sessionStorage.getItem("user");
    // console.log("userData", JSON.parse(data));
    return JSON.parse(data);
  };

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("updated data" , booikgPlace,peopleQunatity,paid,clintId,tourId);

    let bookingpayload = {
      booikgPlace,
      peopleQunatity,
      paid,
      userId: clintId,
      tourId,
    };

    let url = `http://localhost:3001/booking/update/${bookingId}`;
    let header = ApiHeader;
    try {
      const response = await axios.post(url, bookingpayload, header);
      console.log("res of update", response);
      TostSucess("Booking is updated successfully!");
      navigate("/admin/viewbookings");
      //   console.log("12345", JSON.parse(response.config.data  ));
    } catch (error) {
      console.log("error in catch", error);
      //   setErrorName(error.response.data.error.split(" ")[0]);
      //   setError(error.response.data.error);
    }
  };

  return (
    <Container>
      <Row>
        <div className="text-center text-dark mb-4 mt-5">
          <h5>Edit Booking</h5>
        </div>
        <Col lg={3}></Col>
        <Col lg={6}>
          <Form role="form" onSubmit={handleSubmit} method="post">
            <FormGroup>
              <Label style={{ fontWeight: 700 }}>Booking Place Name</Label>
              <InputGroup className="input-group-alternative mb-3">
                <Input
                  name="title"
                  placeholder="Enter title"
                  type="text"
                  value={booikgPlace}
                  onChange={(e) => setBooikgPlace(e.target.value)}
                  required
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label style={{ fontWeight: 700 }}>Select User</Label>
              <Select
                options={listUsers}
                // value={{ id: clintId, firstName: clintName }}
                value={listUsers.find((user) => user.id === clintId)}
                getOptionLabel={(option) => option.firstName}
                getOptionValue={(option) => option.id}
                onChange={(e) => (
                  // console.log("e", e),
                  setClintName(e.firstName), setClintId(e.id)
                )}
                isSearchable
                placeholder="Search..."
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: 700 }}>Select tour</Label>

              <Select
                options={tourList}
                value={tourList.find((user) => user.id === tourId)}
                // value={tourName !== "" ? tourName : "123"}
                getOptionLabel={(option) => option.Name}
                getOptionValue={(option) => option.id}
                onChange={(e) => (setTourName(e.Name), setTourId(e.id))}
                isSearchable
                placeholder="Search..."
              />
            </FormGroup>
            <Row>
              <Col lg={6}>
                {" "}
                <FormGroup>
                  <Label style={{ fontWeight: 700 }}>
                    Person or Group details
                  </Label>
                  <Input
                    required
                    type="text"
                    value={peopleQunatity}
                    placeholder="Enter person quantity"
                    onChange={(e) => setPeopleQunatity(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <Row>
                  <Label style={{ fontWeight: 700 }}>Payment Status</Label>
                  <Col md={6}>
                    <FormGroup>
                      <Label check style={{ fontWeight: 700 }}>
                        Paid{" "}
                      </Label>
                      <Input
                        name="paid"
                        value={true}
                        type="radio"
                        checked={paid === true}
                        onChange={(e) => setPaid(true)}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label check style={{ fontWeight: 700 }}>
                        Unpaid
                      </Label>
                      <Input
                        name="paid"
                        type="radio"
                        value={false}
                        checked={paid === false}
                        onChange={(e) => setPaid(false)}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="d-flex my-3 justify-content-center">
              <Button
                color="warning"
                className="me-4"
                onClick={(e) => navigate("/admin/viewbookings")}
              >
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditBookings;
