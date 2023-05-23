const tourController = require("../controller/tour_controller.js");
const tourRouter = require("express").Router();
const {validateToken} = require("../middleware/Auth")



tourRouter.post("/addtour" , tourController.addTour) 

tourRouter.post("/updateTour/:id" , tourController.updateTour) 

tourRouter.get("/editTour/:id" , tourController.getTour) 

tourRouter.get("/viewalltour" , tourController.getAllTour) 

tourRouter.get("/deleteTour/:id" , tourController.deleteSingleTour) 


module.exports = tourRouter