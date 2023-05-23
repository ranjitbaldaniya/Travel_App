const {validateToken} = require("../middleware/Auth")

const userController = require('../controller/user_controller.js')

const userRouter   = require('express').Router()


userRouter.post('/update/:id',userController.updateUser)

userRouter.get('/list' ,validateToken , userController.getAllUser)

userRouter.get('/edit/:id',userController.getSingleUser)

userRouter.get('/delete/:id',userController.deleteSingleUser)

userRouter.get("/profile" , userController.viewProfile)

userRouter.post("/profile" , userController.updateProfile)




module.exports = userRouter