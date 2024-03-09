const express = require('express');
const app = express();

const db = require('./model/index')

db.sequelize.sync({force: false}) 

require('dotenv').config() 
const port = process.env.PORT || 9000;

//adding route files 
const authRoute = require("./route/authRoute")
const adminRoute = require("./route/adminRoute")
const userRoute = require("./route/userRoute")
 
app.set('view engine', 'ejs')
app.set('views', 'view')


app.use(express.json()); 
app.use(express.urlencoded());


app.use("/auth",authRoute)
app.use("/admin",adminRoute)
app.use("/user",userRoute)

app.listen(port, ()=>{
  console.log(`Server running on port ${port}`)
})