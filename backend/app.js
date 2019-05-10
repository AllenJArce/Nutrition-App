//expressJS code
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user-route");
const feedbackRoutes = require("./routes/feedback-route");
const foodRoutes = require("./routes/food-route");
// const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    'mongodb+srv://Allen:' + process.env.MONGO_ATLAS_PW + '@cluster0-httm4.mongodb.net/Nutrition-App'
  )
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false })); // not needed for this tutorial, but use this to parse urlencoded data
  // app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);
// app.use("/api/feedback", feedbackRoutes);
app.use("/api/food", foodRoutes);

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "angular", "index.html"));
// });

module.exports = app;
