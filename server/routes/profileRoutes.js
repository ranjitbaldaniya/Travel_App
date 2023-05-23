const {validateToken} = require("../middleware/Auth")

const userController = require('../controller/user_controller.js')

const profileRoutes   = require('express').Router()


profileRoutes.post('/register' , userController.register)


profileRoutes.post('/login' ,  userController.login)


module.exports = profileRoutes