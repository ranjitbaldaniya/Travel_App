var db = require("../models");
const { BookingValidation } = require("../middleware/BookingValidation.js");
const Booking = db.Booking;
const User = db.user;
const Tour = db.Tour;
//create booking
const createBooking = async (req, res) => {
  const data = req.body;
  const result = BookingValidation(data);
  const { value, error } = result;
  console.log("value", value);
  const valid = error == null;

  try {
    if (valid) {
      const createBooking = await Booking.create(value);
      res.status(200).json({ message: "Booking Created!", createBooking });
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      // console.log("error", details);
      res.status(422).json({ error: message });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.errors);
  }
};

//update booking
const updateBooking = async (req, res) => {
  const data = req.body;
  let id = req.params.id;

  const result = BookingValidation(data);
  const { value, error } = result;
  console.log("value", value);
  const valid = error == null;

  try {
    if (valid) {
      const updateBooking = await Booking.update(data, { where: { id: id } });
      res.status(200).json({ message: "Booking Updated!", updateBooking });
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.errors);
  }
};

//Get Single Booking
const getSingleBooking = async (req, res) => {
  try {
    let id = req.params.id;
    const data = await Booking.findOne({ where: { id: id } });
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
};

//Get All Booking
const getAllBooking = async (req, res) => {
  console.log("req", req.body);
  try {
    const data = await Booking.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);

    res.status(404).send(error);
  }
};

//Delete single Booking
const deleteSingleBooking = async (req, res) => {
  let id = req.params.id;
  try {
    const data = await Booking.destroy({ where: { id: id } });
    // con sole.log("data", data);
    res.status(200).send("booking deleted!");
  } catch (error) {
    res.status(404).send(error);
  }
};

//getBookingWithUserAndTour
const getBookingWithUserAndTour = async (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  try {
    const getBookingUser = await Booking.findAll({
      include: [
        {
          model: User,
          attributes: ["email", "firstName", "mobileNo" ,"id"],
        },
        {
          model: Tour,
          attributes: ["Name", "discription", "Price", "id"],
        },
      ],
      where: { id: id },
    });
    res.status(200).json({ getBookingUser });
  } catch (error) {
    console.log(error);
    res.status(400).json(error.errors);
  }
};

//getBookingWithUserAndTour
const getBookingWithUserId = async (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  try {
    const getBookingUser = await Booking.findAll({
      include: [
        {
          model: User,
          attributes: ["email", "firstName", "mobileNo" ,"id"],
        },
        {
          model: Tour,
          attributes: ["Name", "discription", "Price", "id"],
        },
      ],
      where: { userId: id },
    });
    res.status(200).json({ getBookingUser });
  } catch (error) {
    console.log(error);
    res.status(400).json(error.errors);
  }
};
module.exports = {
  createBooking,
  updateBooking,
  getSingleBooking,
  getAllBooking,
  deleteSingleBooking,
  getBookingWithUserAndTour,
  getBookingWithUserId
};
