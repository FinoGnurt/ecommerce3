const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    avatar: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
