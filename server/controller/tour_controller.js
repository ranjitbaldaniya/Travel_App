var db = require("../models");
const Joi = require("joi");
const { TourSchemaValidation } = require("../middleware/TourValidation.js");

const Tour = db.Tour;

//add tour api

const addTour = async (req, res) => {
  const data = req.body;
  const result = TourSchemaValidation(data);
  const { value, error } = result;
  console.log("value", value);
  const valid = error == null;
  try {
    if (valid) {
      const createTour = await Tour.create(value);
      res.status(200).json({ message: "Tour Added!", createTour });
    } else {
      const message = details.map((i) => i.message).join(",");
      // console.log("error", message);
      res.status(422).json({ error: message });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.errors);
  }
};

//update tour
const updateTour = async (req, res) => {
  const data = req.body;
  let id = req.params.id;

  const result = TourSchemaValidation.validate(data);
  const { value, error } = result;
  console.log("value", value);
  const valid = error == null;

  try {
    if (valid) {
      const TourUpdated = await Tour.update(value, { where: { id: id } });
      res.status(200).json({ message: "Tour Updated!" });
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      // console.log("error", message);
      res.status(422).json({ error: message });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.errors);
  }
};

//Get one tour
const getTour = async (req, res) => {
  let id = req.params.id;
  try {
    const data = await Tour.findOne({ where: { id: id } });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

//Get all tour
const getAllTour = async (req, res) => {
  try {
    const data = await Tour.findAll();
    res.status(200).send(data);
  } catch (error) {
    //   console.log(error);
    res.status(400).json(error);
  }
};
//Delete single Tour
const deleteSingleTour = async (req, res) => {
  let id = req.params.id;
  const data = await Tour.destroy({ where: { id: id } });
  // con sole.log("data", data);
  res.status(200).send("Tour deleted!");
};

module.exports = { addTour, updateTour, getTour, getAllTour, deleteSingleTour };
