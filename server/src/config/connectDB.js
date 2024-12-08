const chalk = require("chalk");
const mongoose = require("mongoose");
// {default:mongoose}

const connectDB = async () => {
  setTimeout(async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URL);
      if (conn.connection.readyState === 1)
        console.log(chalk.blue(" ==> DB connection is successfully! "));
      else console.log(chalk.yellow(" ==> DB connecting..."));
    } catch (error) {
      console.log(chalk.bgBlack.red.bold(" DB connect is failed "));
      //   throw new Error(error);
    }
  }, 1000);
};

module.exports = connectDB;
