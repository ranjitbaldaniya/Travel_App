var db = require("../models");
const { InquiryValidation } = require("../middleware/InquiryValidation.js");
const Inquiry = db.Inquiry;

//create inquiry
const createInquiry = async (req, res) => {
  const data = req.body;
  const result = InquiryValidation(data);
  const { value, error } = result;
  console.log("value", value);
  const valid = error == null;

  try {
    if (valid) {
      const createInquiry = await Inquiry.create(value);
      res.status(200).json({ message: "Inquiry Created!", createInquiry });
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

//update inquiry
const updateInquiry = async (req, res) => {
  const data = req.body;
  let id = req.params.id;

  const result = InquiryValidation(data);
  const { value, error } = result;
  console.log("value", value);
  const valid = error == null;

  try {
    if (valid) {
      const updateInquiry = await Inquiry.update(data, { where: { id: id } });
      res.status(200).json({ message: "Inquiry Created!", updateInquiry });
    } else {
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.errors);
  }
};

//Get Inquiry
const getSingleInquiry = async (req, res) => {
  try {
    let id = req.params.id;
    const data = await Inquiry.findOne({ where: { id: id } });
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
};

//Get All Inquiry
const getAllInquiry = async (req, res) => {
  try {
    const data = await Inquiry.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).send(error);
  }
};

//Delete single Inquiry
const deleteSingleInquiry = async (req, res) => {
  let id = req.params.id;
  try {
    const data = await Inquiry.destroy({ where: { id: id } });
    // con sole.log("data", data);
    res.status(200).send("Inquiry deleted!");
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  createInquiry,
  updateInquiry,
  getAllInquiry,
  getSingleInquiry,
  deleteSingleInquiry,
};
