const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./model/index");

db.sequelize.sync({ force: false });

require("dotenv").config();
const port = process.env.PORT || 9000;

//adding route files
const authRoute = require("./route/authRoute");
const adminRoute = require("./route/adminRoute");
const userRoute = require("./route/userRoute");
const globalRoute = require("./route/globalRoute");
const paymentRoute = require("./route/paymentRoute");

app.set("view engine", "ejs");
// app.set("views", "view");

//Node js laii file access garna dine
app.use(express.static("public/"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/global", globalRoute);
app.use("/payment", paymentRoute);

app.use(
  cors({
    origin: "*",
  })
);

app.get("/home", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/services", (req, res) => {
  res.render("services.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
