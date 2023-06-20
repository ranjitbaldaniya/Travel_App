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
import { useNavigate } from "react-router-dom";



const AddBookings = () => {
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

  const navigate = useNavigate();

  //useEffect for fetching Tour data
  useEffect(() => {
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
      console.log("res", response.data);
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
      // console.log("res", response.data);
      setTourList(response.data);
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
    // console.log("add data" , booikgPlace,peopleQunatity,paid,clintId,tourId);
    let bookingpayload = {
      booikgPlace,
      peopleQunatity,
      paid,
      userId: clintId,
      tourId,
    };
    console.log("bookingpayload", bookingpayload);

    let url = "http://localhost:3001/booking/addbooking";
    let header = ApiHeader;

    try {
      const response = await axios.post(url, bookingpayload, header);
      console.log("response", response);
      setPaid("");
      setPeopleQunatity("");
      setBooikgPlace("");
      TostSucess("Booking Submited Successfully!!");
      navigate(`/admin/viewbookings`);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container>
      <Row>
        <div className="text-center text-dark mb-4 mt-5">
          <h5>Add Booking</h5>
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
                  onChange={(e) => setBooikgPlace(e.target.value)}
                  required
                />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <Label style={{ fontWeight: 700 }}>Select User</Label>

              <Select
                required
                options={listUsers}
                value={clintName.firstName}
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
                required
                options={tourList}
                value={tourName.Name}
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
                        value="true"
                        type="radio"
                        onChange={(e) => setPaid(e.target.value)}
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
                        value="false"
                        onChange={(e) => setPaid(e.target.value)}
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

export default AddBookings;
