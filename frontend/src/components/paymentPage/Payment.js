import React, { useState, useEffect } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckOutForm";
import "./stripe.css";
import { useParams } from "react-router-dom";

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  console.log("secret", clientSecret);
  const bookingId = useParams();
console.log(bookingId)
   //handleGetBooking
   const handleGetBooking = async () => {
    let url = `http://localhost:3001/booking/getBookingWithUser/${bookingId.id}`;
    try {
      const response = await axios.get(url, bookingId);
      console.log("res", response.data);
     
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  useEffect(() => {
    handleGetBooking()
  }, [])
  


  
  useEffect(() => {
    // // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:3001/payment/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 5000 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
    // axios
    //   .post("http://localhost:3001/payment/pay", {
    //     items: [{ amount: "5000" }],
    //   })
    //   .then((response) => {
    //     console.log("respomceee" , response)
    //     const { clientSecret } = response.data;
    //     setClientSecret(clientSecret);
    //   })
    //   .catch((error) => {
    //     console.error("Error creating PaymentIntent:", error);
    //   });
  }, []);

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
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
