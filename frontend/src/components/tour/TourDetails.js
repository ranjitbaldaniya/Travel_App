import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ApiHeader from "../commonFunctions/ApiHeader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import Loader from "../commonFunctions/Loader.js";
const TourDetails = () => {
  const userId = useParams();
  // console.log("id", userId.id);
  const [name, setName] = useState("");
  const [tourDiscription, setTourDiscription] = useState("");
  const [tourId, setTourId] = useState("");
  const [price, setPrice] = useState("");
  const [packageDays, setPackageDays] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);

  //form state for inquiry
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [userData, setUserData] = useState("");
  console.log("userData", userData);
  const toggle = () => {
    if (userData) {
      setModal(!modal);
    } else {
      navigate("/login");
    }
  };

  const navigate = useNavigate();

  //handleGetTour
  const handleGetTour = async () => {
    let url = `http://localhost:3001/tour/editTour/${userId.id}`;
    try {
      const response = await axios.get(url, userId);
      console.log("res", response.data);
      setName(response.data.Name);
      setTourDiscription(response.data.Discription);
      setPrice(response.data.Price);
      setPackageDays(response.data.PackageDays);
      setStartDate(response.data.StartDate);
      setEndDate(response.data.EndDate);
      setImage(response.data.Image);
      setTourId(response.data.id);
      // setTour(response.data);
      setLoading(true);
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

  //useEffect for getTours
  useEffect(() => {
    setLoading(false);
    handleGetTour();
    const data = getCurrentUser();
    setUserData(data);
  }, []);

  //handle submit for submiting inquiries
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("handle called");
    let inquiryPayload = {
      title,
      discription,
      createdBy: userData.id,
      tourId: tourId,
      userId: userData.id,
      status: "Pending"
    };
    let header = ApiHeader;

    // console.log("123", inquiryPayload , ApiHeader);

    let url = "http://localhost:3001/inquiry/addInquiry";

    try {
      const response = await axios.post(url, inquiryPayload, header);

      console.log("res", response);
      handleSendEmail();
      setTitle("");
      setDiscription("");
      setUserData("");
      toggle();
      TostSucess2("Inquiry Submited Successfully!!");
      const data = getCurrentUser();
      setUserData(data);
      navigate(`/user`);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSendEmail = () => {
    const form = document.createElement("form");
    form.style.display = "none";

    const inputToName = document.createElement("input");
    inputToName.type = "text";
    inputToName.name = "to_name";
    inputToName.value = "Ranjit";
    form.appendChild(inputToName);

    const inputFromName = document.createElement("input");
    inputFromName.type = "text";
    inputFromName.name = "from_name";
    inputFromName.value = userData.firstName;
    form.appendChild(inputFromName);

    const inputSubject = document.createElement("input");
    inputSubject.type = "text";
    inputSubject.name = "subject";
    inputSubject.value = title;
    form.appendChild(inputSubject);

    const inputMessage = document.createElement("textarea");
    inputMessage.name = "message";
    inputMessage.value = discription;
    form.appendChild(inputMessage);

    document.body.appendChild(form);

    emailjs
      .sendForm(
        "service_oawdr9j", // service_id
        "template_49zxjot", // template_id
        form,
        "muaAFSUz_GoZZ36TR" // public_key
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    document.body.removeChild(form);
  };

  const TostSucess2 = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
    });
  };
  const sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: "url(" + `http://localhost:3001/${image} ` + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      {!loading ? (
        <>
          <Loader />
        </>
      ) : (
        <Container fluid>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <section style={sectionStyle}></section>
              <h2 className="text-center">
                Tour Name : <span className="text-warning ">{name}</span>
              </h2>
              <h6>Discription :-</h6>
              <p className="">{tourDiscription}</p>
              <hr />
              <div className="d-flex justify-content-between">
                <h5 className=" text-muted " tag="h6">
                  Price: <span className="text-dark">{price}</span>
                </h5>
                <h5 className=" text-muted ">
                  Total Days:<span className="text-dark"> {packageDays}</span>
                </h5>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h5 className=" text-muted ">
                  Tour Start From{" "}
                  <span className="text-dark">
                    {moment(startDate).utc().format("DD-MM-YYYY")}
                  </span>{" "}
                  To{" "}
                  <span className="text-dark">
                    {moment(endDate).utc().format("DD-MM-YYYY")}
                  </span>
                </h5>
                <Button
                  color="warning"
                  onClick={toggle}
                  // onClick={() => navigate("/user/tour/inquiry")}
                >
                  Inquiry
                </Button>
              </div>
              <hr />

              <Modal isOpen={modal} toggle={toggle}>
                <Form role="form" onSubmit={handleSubmit} method="post">
                  <ModalHeader
                    className="font-weight-bold text-center text-primary"
                    toggle={toggle}
                  >
                    Book your tour now
                  </ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label>Title</Label>
                      <InputGroup className="input-group-alternative mb-3">
                        <Input
                          name="title"
                          placeholder="Enter title"
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label>Discription</Label>
                      <InputGroup className="input-group-alternative mb-3">
                        <Input
                          name="discription"
                          placeholder="Enter discription"
                          type="textarea"
                          onChange={(e) => setDiscription(e.target.value)}
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter className="text-center justify-content-center">
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                    <Button color="warning" className="me-4" onClick={toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Form>
              </Modal>
              <ToastContainer />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default TourDetails;
