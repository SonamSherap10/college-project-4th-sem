const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./model/index')

db.sequelize.sync({force: false})   

require('dotenv').config()  
const port = process.env.PORT || 9000; 

//adding route files  
const authRoute = require("./route/authRoute")
const adminRoute = require("./route/adminRoute")  
const userRoute = require("./route/userRoute")   
const globalRoute = require("./route/globalRoute")
const paymentRoute = require("./route/paymentRoute")

app.set('view engine', 'ejs')
app.set('views', 'view') 


app.use(express.json()); 
app.use(express.urlencoded({extended: false}));

app.use(cors({
  origin : "*"
}))
  

app.use("/auth",authRoute)   
app.use("/admin",adminRoute)
app.use("/user",userRoute)
app.use("/global",globalRoute)
app.use("/payment",paymentRoute)

app.get("/",(req,res)=>{
  res.json({
    message : "Hello World"
  })
})

app.use(express.static("./uploads"))

app.listen(port, ()=>{
  console.log(`Server running on port ${port}`)
})