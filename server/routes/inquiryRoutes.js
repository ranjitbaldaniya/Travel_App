const inquiry_contoller = require("../controller/inquiry_controller.js");
const { validateToken } = require("../middleware/Auth.js");
const inquiryRouter = require("express").Router();

inquiryRouter.post("/addInquiry",validateToken,inquiry_contoller.createInquiry);

inquiryRouter.post("/update/:id", inquiry_contoller.updateInquiry);

inquiryRouter.get("/edit/:id", inquiry_contoller.getSingleInquiry);

inquiryRouter.get("/list", validateToken, inquiry_contoller.getAllInquiry);

inquiryRouter.get("/delete/:id",validateToken, inquiry_contoller.deleteSingleInquiry);

module.exports = inquiryRouter;
