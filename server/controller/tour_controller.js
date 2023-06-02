var db = require("../models");
const path = require("path");
const multer = require("multer");
const { TourSchemaValidation , UpdateTourSchemaValidation} = require("../middleware/TourValidation.js");

const Tour = db.Tour;

//upload image controller

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "5000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give Proper files formate to upload!");
  },
}).single('Image')

//add tour api
const addTour = async (req, res) => {
  const data = req.body;
  // console.log("data", data);
  // console.log("data1", req.file);
  // console.log("data2", req.file.path);

  const dataWithImg =  {
    Name: data.Name,
    Discription: data.Discription,
    Price: data.Price,
    StartDate: data.StartDate,
    EndDate: data.EndDate,
    PackageDays: data.PackageDays,
    Image: req.file.path
  }

  const result = TourSchemaValidation(dataWithImg);
  const { value, error } = result;
  console.log("value", value);
  const valid = error == null;
  try {
    if (valid) {
      const createTour = await Tour.create(value);
      res.status(200).json({ message: "Tour Added!", createTour });
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

//update tour
const updateTour = async (req, res) => {
  const data = req.body;
  // console.log("data" , data)

  let id = req.params.id;
  const dataToUpdate =  {
    Name: data.Name,
    Discription: data.Discription,
    Price: data.Price,
    StartDate: data.StartDate,
    EndDate: data.EndDate,
    PackageDays: data.PackageDays,
    Image: req.file ? req.file.path : data.Image
  }
  console.log("123" , dataToUpdate)
  const result = UpdateTourSchemaValidation(dataToUpdate);
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
  // console.log("id" , id)
  try {
    const data = await Tour.findOne({ where: { id: id } });
    // console.log("getTour" , data)
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

module.exports = { addTour, updateTour, getTour, getAllTour, deleteSingleTour , upload};
