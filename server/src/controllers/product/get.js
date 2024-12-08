const productModel = require("../../models/product");
const brandModel = require("../../models/brand");

const getProducts = async (req, res) => {
  try {
    // Thêm product
    const product = await productModel.find();

    res.status(201).json({
      success: true,
      data: product,
      message: "Lấy sản phẩm thành công!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: null, message: err.message || err });
  }
};

module.exports = getProducts;
