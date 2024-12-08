const productModel = require("../../models/product");

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Missing input id brand!!!");

    const product = await productModel.findByIdAndDelete({ _id: id });

    res.status(201).json({
      success: true,
      data: product,
      message: "Xóa sản phẩm thành công.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: null, message: error.message || error });
  }
};

module.exports = deleteProduct;
