const express = require("express");
require("dotenv").config();
const chalk = require("chalk");
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use("/api", router);

app.listen(port, () =>
  console.log(
    chalk.bgHex("#2C3E50").green.bold(`Server is running on port ${port}!`)
  )
);
