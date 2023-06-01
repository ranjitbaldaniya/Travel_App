const { validateToken } = require("../middleware/Auth");

const userController = require("../controller/user_controller.js");

const userRouter = require("express").Router();

userRouter.post("/adduser",validateToken, userController.addUser);

userRouter.post("/update/:id",validateToken, userController.updateUser);

userRouter.get("/list", validateToken, userController.getAllUser);

userRouter.get("/edit/:id", validateToken, userController.getSingleUser);

userRouter.get("/delete/:id", validateToken, userController.deleteSingleUser);

userRouter.get("/profile", userController.viewProfile);

userRouter.post("/profile", userController.updateProfile);

module.exports = userRouter;
