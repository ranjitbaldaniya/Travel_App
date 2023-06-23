import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const Stripe = () => {
    let stripePromise;

    console.log("called staripe")
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

export default Stripe;
