import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiHeader from "../commonFunctions/ApiHeader.js";
import {
  Button,
  Card,
  Form,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Label,
  FormGroup,
  InputGroup,
} from "reactstrap";
import Select from "react-select";
import axios from "axios";
import { TostSucess } from "../commonFunctions/Tost.js";

const EditInquiry = () => {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const [tourList, setTourList] = useState([]);
  // console.log("tourList", tourList);
  // console.log("listUsers", listUsers);
  const [clintName, setClintName] = useState("");
  const [clintId, setClintId] = useState("");
  const [tourName, setTourName] = useState("");
  // console.log("tourName", tourName);

  const [tourId, setTourId] = useState("");
  const Params = useParams();
  const userId = Params.id;
  const navigate = useNavigate();

  //handleGetInquiries
  const handleGetInquiries = async () => {
    let url = `http://localhost:3001/inquiry/edit/${userId}`;
    let header = ApiHeader;
    try {
      const response = await axios.get(url, header);
      // console.log("res", response.data);
      setTitle(response.data.title);
      setDiscription(response.data.discription);
      setClintId(response.data.userId);
      setTourId(response.data.tourId);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

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
      // console.log("res123", response.data);
      setTourList(response.data);

      let filteredTour = response.data.filter((e) => userId == e.id);
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

  //useEffect for handleGetInquiries
  useEffect(() => {
    handleGetInquiries();
    handleListUser();
    handleTourList();
    const data = getCurrentUser();
    setCurrentUser(data);
  }, []);

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("called", tourId, clintId, title, discription, currentUser.id);

    let dataToUpdate = {
      title,
      discription,
      tourId: tourId,
      userId: clintId,
      updatedBy: currentUser.id,
    };

    let url = `http://localhost:3001/inquiry/update/${userId}`;
    let header = ApiHeader;
    console.log("Inquiry data to update", dataToUpdate);
    try {
      const response = await axios.post(url, dataToUpdate, header);
      console.log("res of update", response);
      TostSucess("Iquiry is updated successfully!");
      navigate("/admin/inquiries");
      //   console.log("12345", JSON.parse(response.config.data  ));
    } catch (error) {
      console.log("error in catch", error);
      //   setErrorName(error.response.data.error.split(" ")[0]);
      //   setError(error.response.data.error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <div className="text-center text-dark mb-4 mt-5">
            <h5>Edit Inquiries</h5>
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
                    value={title}
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
                    value={discription}
                    onChange={(e) => setDiscription(e.target.value)}
                    // required
                  />
                </InputGroup>
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
                  value={tourList.find(user => user.id === tourId)}
                  // value={tourName !== "" ? tourName : "123"}
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
                  // value={{ id: clintId, firstName: clintName }}
                  value={listUsers.find(user => user.id === clintId)}
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

export default EditInquiry;
