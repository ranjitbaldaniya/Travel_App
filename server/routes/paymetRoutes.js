const paymentController = require("../controller/paymet_controller");
const paymetRouter = require("express").Router();

paymetRouter.post("/pay", paymentController.pay);
paymetRouter.post("/payhere", paymentController.pay);


module.exports = paymetRouter;
