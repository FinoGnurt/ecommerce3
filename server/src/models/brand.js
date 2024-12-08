const mongoose = require("mongoose");

const brandSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

brandSchema.pre("save", function (next) {
  if (this.name) {
    this.name = this.name.toLowerCase();
  }

  next();
});

module.exports = mongoose.model("brand", brandSchema);
