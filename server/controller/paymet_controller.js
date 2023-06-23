const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");

const payment = async (req, res) => {
  try {
    const { amount, currency, paymentMethodId, description } = req.body;

    console.log("request.body", req.body);
    // console.log("requesttttt", process.env.STRIPE_SECRET_KEY);
    // Create a payment intent
    const paymentIntent = await stripe.checkout.sessions.create(
      {
        payment_method_types: ["card"],
        mode: "cors ",
        line_items: req.body.items.map((item) => {
          return {
            price_data: {
              currency: "inr",
              product_data: { name: item.name },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `http://localhost:3000/user/success`,
        cancel_url: `http://localhost:3000/user/error`,
      },

      {
        // Make sure to include the API key in the Authorization header
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );

    // Payment successful
    res.status(200).json({ url: paymentIntent.url });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Payment failed" });
  }
};

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

const pay = async (req, res) => {
  const { amount } = req.body;
console.log("123" , amount)
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount : amount,
    payment_method_types: ["card"],
    currency: "inr",
   
  }); 

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = { payment, pay };
