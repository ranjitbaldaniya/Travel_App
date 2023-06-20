const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  const access_token = sign(
    { email: user.email, userId: user.id },
    "12bob12ou2b1ob"
  );

  return access_token;
};

const validateToken = (req, res, next) => {
  // const access_token = req.cookies["access_token"];
  //   const access_token = (req.headers.authorization);
  // console.log("validate token header " , req.headers)
  const token = req.headers.authorization.split(" ")[1];

  // console.log("access-token ", token);
  if (!token) return res.status(400).json({ error: "User not Authenticated!" });

  try {
    // console.log("123")
    const validToken = verify(token, "12bob12ou2b1ob");
    // const userId = validToken.userId;
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = { createToken, validateToken };
