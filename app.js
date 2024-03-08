const express = require('express');
const app = express();

const db = require('./model/index')

db.sequelize.sync({force: true}) 

require('dotenv').config() 
const port = process.env.PORT || 9000;

//adding route files 
const authRoute = require("./route/authRoute")
 
app.set('view engine', 'ejs')
app.set('views', 'view')


app.use(express.json()); 
app.use(express.urlencoded());


app.use("/auth",authRoute)

app.listen(port, ()=>{
  console.log(`Server running on port ${port}`)
})