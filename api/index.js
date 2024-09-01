const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
const cors = require("cors");

const port = 3000;

// env
dotenv.config();

app.use(express.urlencoded({ extended: true }));

// to use json in express
app.use(express.json());

// set up cors
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "https://runwayriot.onrender.com",
    "https://runwayriot-admin.onrender.com",
  ],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  optionSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connceted successfully");

    app.listen(port, () => {
      console.log(`Listening to request coming from ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//   routes
app.use("/account", userRoutes);
app.use("/blog", blogRoutes);
app.use("/user", forgotPasswordRoutes);
