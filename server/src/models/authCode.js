const mongoose = require("mongoose");

// Tạo schema với trường có TTL
const authCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["createAccount", "forgotPassword"],
    required: "true",
  },
  data: { type: String, required: true },
  expiresAt: { type: Date, index: { expires: 0 } }, // TTL dựa trên giá trị của expiresAt
});

const authCode = mongoose.model("authCode", authCodeSchema);

module.exports = authCode;
