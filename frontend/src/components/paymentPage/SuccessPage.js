import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import emailjs from "@emailjs/browser";
import axios from "axios";

const WrappedSuccessPage = () => {
  const [message, setMessage] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  // console.log("bookingData", bookingData);

  const stripe = useStripe();
  const bookingId = useParams();

  // console.log("bookingId", bookingId.id);

  useEffect(() => {
    handleGetBooking();
  }, []);

  //handleGetBooking
  const handleGetBooking = async () => {
    let url = `http://localhost:3001/booking/getBookingWithUser/${bookingId.id}`;
    try {
      const response = await axios.get(url, bookingId);
      // console.log("res", response.data);
      setBookingData(response.data);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  useEffect(() => {
    console.log("useEffect is called!!!");
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    // console.log("clientSecret is called!!!", clientSecret);

    if (!clientSecret) {
      return;
    }
    if (!bookingData) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      // console.log("123", paymentIntent);
      switch (paymentIntent.status) {
        case "succeeded":
          // console.log("its called");
          handleSendEmail();
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSendEmail = () => {
    // alert("email sended!");
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
    inputFromName.value = bookingData.getBookingUser[0].user.firstName;
    form.appendChild(inputFromName);

    const inputSubject = document.createElement("input");
    inputSubject.type = "text";
    inputSubject.name = "subject";
    inputSubject.value = "Payment recived";
    form.appendChild(inputSubject);

    const inputMessage = document.createElement("textarea");
    inputMessage.name = "message";
    inputMessage.value = bookingData.getBookingUser[0].Tour?.Name;
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

  return (
    <Container className="mt-5">
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} style={{ height: "525px" }}>
          <Card className="mt-5 mb-5 p-5">
            <div className="text-center">
              <h1 className="text-success">Success!</h1>
              <p>Your Payment has been processed successfully.</p>
              <Link to="/user">
                <Button color="warning">Home</Button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
const stripePromise = loadStripe(
  "pk_test_51NLg5MLSBRw5tzKOUbBcxa71HRMLVOXYGQA4XQhbpFqzcFXrj5llK5abMObTypoikkrPi1HusIzsvTGri3BjukSs001BTPmfMH"
);

const SuccessPage = () => (
  <Elements stripe={stripePromise}>
    <WrappedSuccessPage />
  </Elements>
);

export default SuccessPage;
