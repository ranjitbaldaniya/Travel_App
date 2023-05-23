const express = require("express");
const bodyParser = require("body-parser");
require('./models')
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Profile Router
const profileRoutes = require("./routes/profileRoutes")
app.use('/admin/profile' , profileRoutes)

//user Router
const userRouter = require("./routes/userRoutes")
app.use('/admin/user' , userRouter)

//tour Router
const tourRouter = require("./routes/tourRoutes")
app.use('/tour' , tourRouter)

//inquiry Router
const inquiryRouter = require("./routes/inquiryRoutes")
app.use('/inquiry' , inquiryRouter)

//test api
app.get('/',(req, res) => {
    res.send("All good!")
})

app.listen(3001 , ()=>{
    console.log("server started on port 3001")
})