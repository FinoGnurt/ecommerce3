const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    productId: {
      ref: "product",
      type: String,
    },
    quantity: Number,
    userId: String,
    colorId: String,
  },
  {
    timestamps: true,
  }
);

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;
