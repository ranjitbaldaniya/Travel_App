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
const AddInquiry = () => {
  // const [inquiryData, setInquiryData] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const [tourList, setTourList] = useState([]);
  // console.log("tourList", tourList);
  // console.log("listUsers", listUsers);
  const [currentUser, setCurrentUser] = useState("");
  const [clintId, setClintId] = useState("");
  const [clintName, setClintName] = useState("");
  // console.log("clintName", clintName);
  const [tourId, setTourId] = useState("");
  const [tourName, setTourName] = useState("");
  const StatusList = [
    { value: "Pending", label: "Pending" },
    { value: "InProgress", label: "InProgress" },
    { value: "Completed", label: "Completed" },
  ];
  const [status, setStatus] = useState("Pending");
  console.log("status", status);
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("called", tourId, clintId, status , title, discription, currentUser.id);

    let inquiryPayload = {
      title,
      discription,
      createdBy: currentUser.id,
      tourId: tourId,
      userId: clintId,
      status: status,
    };

    console.log("inquiryPayload", inquiryPayload);
    let header = ApiHeader;

    let url = "http://localhost:3001/inquiry/addInquiry";

    try {
      const response = await axios.post(url, inquiryPayload, header);
      console.log("res", response);
      setTitle("");
      setDiscription("");
      TostSucess("Inquiry Submited Successfully!!");

      navigate(`/admin/inquiries`);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <div className="text-center text-dark mb-4 mt-5">
            <h5>Add Inquiry</h5>
          </div>
          <Col lg={2}></Col>
          <Col lg={8}>
            <Form role="form" onSubmit={handleSubmit} method="post">
              <FormGroup>
                <Label style={{ fontWeight: 700 }}>Title</Label>
                <InputGroup className="input-group-alternative mb-3">
                  <Input
                    name="title"
                    placeholder="Enter title"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    // required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label style={{ fontWeight: 700 }}>Discription</Label>
                <InputGroup className="input-group-alternative mb-3">
                  <Input
                    name="discription"
                    placeholder="Enter discription"
                    type="textarea"
                    onChange={(e) => setDiscription(e.target.value)}
                    // required
                  />
                </InputGroup>
              </FormGroup>

                <FormGroup>
                  <Label style={{ fontWeight: 700 }}>Status</Label>
                  <Input
                    type="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option disabled>Select status</option>
                    {StatusList.map((data) => (
                      <option value={data.value} key={data.value}>
                        {data.label}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

              <FormGroup>
                <Label style={{ fontWeight: 700 }}>Select tour</Label>
                {/* <Input
                  type="select"
                  value={tourList.id}
                  onChange={(e) => setTourId(e.target.value)}
                >
                  {tourList.map((data) => (
                    <option value={data.id} key={data.id}>
                      {data.Name}
                    </option>
                  ))}
                </Input> */}
                <Select
                  options={tourList}
                  value={tourName.Name}
                  getOptionLabel={(option) => option.Name}
                  getOptionValue={(option) => option.id}
                  onChange={(e) => (setTourName(e.Name), setTourId(e.id))}
                  isSearchable
                  placeholder="Search..."
                />
              </FormGroup>
              <FormGroup>
                <Label style={{ fontWeight: 700 }}>Select User</Label>
                {/* <Input
                  type="select"
                  value={listUsers.id}
                  onChange={(e) => setClintId(e.target.value)}
                >
                  {listUsers.map((data) => (
                    <option value={data.id} key={data.id}>
                      {data.firstName}
                    </option>
                  ))}
                </Input> */}
                <Select
                  options={listUsers}
                  value={clintName.firstName}
                  getOptionLabel={(option) => option.firstName}
                  getOptionValue={(option) => option.id}
                  onChange={(e) => (
                    console.log("e", e),
                    setClintName(e.firstName),
                    setClintId(e.id)
                  )}
                  isSearchable
                  placeholder="Search..."
                />
              </FormGroup>
              <div className="d-flex my-3 justify-content-center">
                <Button
                  color="warning"
                  className="me-4"
                  onClick={(e) => navigate("/admin/inquiries")}
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
    </>
  );
};

export default AddInquiry;
