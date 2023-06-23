var db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const {
  UserValidation,
  UpdateUserValidation,
  AddUserValidation,
  UpdateProfileValidation,
} = require("../middleware/UserValidation.js");
const { createToken } = require("../middleware/Auth.js");
const User = db.user;

//register user api
const register = async (req, res) => {
  const data = req.body;
  const result = UserValidation(data);
  const { value, error } = result;
  // console.log("value", value);
  // console.log("error", result);

  const valid = error == null;

  try {
    if (valid) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      let userObject = {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: hash,
        mobileNo: value.mobileNo,
        gender: value.gender,
        role: "user",
        dob: value.dob,
        status: value.status,
        createdBy: null,
        updateBy: null,
      };
      const createUser = await User.create(userObject);
      res.status(200).json({ message: "User Created!", createUser });
    } else {
      const { details } = error;
      console.log("error", error);
      const message = details.map((i) => i.message).join(",");
      // console.log("error", message);
      res.status(422).json({ error: message });
    }
  // } catch (error) {
  //   // console.warn("error in catch" , error);
  //   const message = error.errors
  //   console.warn("error in message" , message);
  //   message.forEach((errorItem) => {
  //     const errorMessage = errorItem.message;
  //     console.warn("errorMessage " + errorMessage);
  //   });
    
  //   console.warn("error in message123" , message);

  //   res.status(400).json({error : message});
  // }
  } catch (error) {
    // console.warn("error in catch", error);
    const messages = error.errors.map(errorItem => errorItem.message);
    console.warn("error messages:", messages);
    
    res.status(400).json({ error: messages });
  }
};

//login user api
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Request missing email or password" });
  }
  const user = await User.findOne({ where: { email } });
  if (user) {
    const password_valid = await bcrypt.compare(password, user.password);
    if (password_valid) {
      const access_token = createToken(user);
      res.cookie("access_token", access_token);
      res.status(200).json({ access_token, user });
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(404).json({ error: "User does not exist" });
  }
};

//update user
const updateUser = async (req, res) => {
  let id = req.params.id;
  const data = req.body;
  const result = UpdateUserValidation(data);
  const { value, error } = result;
  console.log("value", value);
  const valid = error == null;
  // console.log("data", data);
  try {
    if (valid) {
      const userUpdated = await User.update(data, { where: { id: id } });
      res.status(200).send("user updated!");
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      // console.log("error", message);
      res.status(422).json({ error: message });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json(error.errors);
  }
};

//get all user
const getAllUser = async (req, res) => {
  // console.log("1", req.query.search);
  const searchQuery = req.query.search;
  try {
    let whereCondition = {};

    if (searchQuery) {
      whereCondition = {
        [Op.or]: [
          { firstName: { [Op.like]: `%${searchQuery}%` } },
          // { email: { [Op.like]: `%${searchQuery}%` } },
        ],
      };
    }

    const data = await User.findAll({ where: whereCondition });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).send(error);
  }
};

//get single user
const getSingleUser = async (req, res) => {
  try {
    let id = req.params.id;
    const data = await User.findOne({ where: { id: id } });
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
};

//Delete single user
const deleteSingleUser = async (req, res) => {
  let id = req.params.id;
  try {
    const data = await User.destroy({ where: { id: id } });
    // con sole.log("data", data);
    res.status(200).send("user deleted!");
  } catch (error) {
    res.status(404).send(error);
  }
};

//User Profile
const viewProfile = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const validToken = jwt.verify(token, "12bob12ou2b1ob");
  const userId = validToken.userId;
  try {
    const data = await User.findOne({ where: { id: userId } });
    res.status(200).send({ data });
  } catch (error) {
    res.status(404).send(error);
  }
};

//Update User Profile
const updateProfile = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  // console.log("token"  , token)
  const validToken = jwt.verify(token, "12bob12ou2b1ob");
  const userId = validToken.userId;
  const data = req.body;
  const result = UpdateProfileValidation(data);
  const { value, error } = result;
  // console.log("value", value);
  const valid = error == null;
  // console.log("data", data);
  try {
    if (valid) {
      const userUpdated = await User.update(value, { where: { id: userId } });
      res.status(200).send("profile updated successfully!");
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      // console.log("error", message);
      res.status(422).json({ error: message });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json(error.errors);
  }
};

//Add  user api
const addUser = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const result = AddUserValidation(data);
  const { value, error } = result;
  const valid = error == null;
  try {
    if (valid) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      let userObject = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hash,
        mobileNo: data.mobileNo,
        gender: data.gender,
        role: data.role,
        dob: data.dob,
        status: data.status,
        createdBy: null,
        updateBy: null,
      };

      const userCreated = await User.create(userObject);
      res.status(200).json({ message: "User created", userCreated });
    } else {
      const { details } = error;
      console.log("error", error);
      const message = details.map((i) => i.message).join(",");
      res.status(400).json({ error: message });
    }
  } catch (error) {
    // console.log(error)
    res.status(400).json(error.errors);
  }
};

module.exports = {
  register,
  login,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteSingleUser,
  viewProfile,
  updateProfile,
  addUser,
};
