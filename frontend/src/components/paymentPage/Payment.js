import React, { useState, useEffect } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckOutForm";
import "./stripe.css";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState("");
  const [peopleQunatity, setPeopleQunatity] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState("");
  console.log("userData", userData);
  const bookingId = useParams();

  const totalAmount = amount * peopleQunatity;
  // console.log("totalAmount", totalAmount);
  useEffect(() => {
    handleGetBooking();
  }, []);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (amount !== "") {
      createPayment();
    }
  }, [amount]);

  //handleGetBooking
  const handleGetBooking = async () => {
    let url = `http://localhost:3001/booking/getBookingWithUser/${bookingId.id}`;
    try {
      const response = await axios.get(url, bookingId);
      console.log("res", response.data);
      setAmount(response.data.getBookingUser[0].Tour.Price);
      setPeopleQunatity(response.data.getBookingUser[0].peopleQunatity);
      setUserData(response.data.getBookingUser[0]);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  const createPayment = () => {
    fetch("http://localhost:3001/payment/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: totalAmount * 100,
        bookingId: bookingId.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const stripePromise = loadStripe(
    "pk_test_51NLg5MLSBRw5tzKOUbBcxa71HRMLVOXYGQA4XQhbpFqzcFXrj5llK5abMObTypoikkrPi1HusIzsvTGri3BjukSs001BTPmfMH"
  );

  return (
    <Container className="text-center d-flex justify-content-center mt-5 mb-5">
      <div className="Stripe">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm bookingId={bookingId.id} />
          </Elements>
        )}
      </div>
    </Container>
  );
};

export default Payment;
