const booking_controller = require("../controller/booking_controller");
const { validateToken } = require("../middleware/Auth.js");
const bookingRouter = require("express").Router();

bookingRouter.post("/addbooking", validateToken,booking_controller.createBooking);

bookingRouter.post("/update/:id",validateToken, booking_controller.updateBooking);

bookingRouter.get("/edit/:id", booking_controller.getSingleBooking);

bookingRouter.get("/list", validateToken, booking_controller.getAllBooking);

bookingRouter.get("/delete/:id",validateToken, booking_controller.deleteSingleBooking);

bookingRouter.get("/getBookingWithUser/:id", booking_controller.getBookingWithUserAndTour);

module.exports = bookingRouter;
