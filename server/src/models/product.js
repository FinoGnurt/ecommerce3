const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: { type: Array, required: true },
    brand: { type: String, required: true },
    colors: [
      {
        color: { type: String, required: true },
        price: { type: Number },
        sellingPrice: { type: Number, required: true },
      },
    ],
    information: { type: String, required: true },
    description: String,
    rating: { type: Number, default: 0, min: 0, max: 5 },
    slug: { type: String, required: true },
    bestSeller: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("product", productSchema);

module.exports = product;
