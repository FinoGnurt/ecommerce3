const addToCartModel = require("../../models/cart");

const deleteAddToCartProduct = async (req, res) => {
  try {
    const { cartId } = req.body;

    const deleteProduct = await addToCartModel.deleteOne({
      _id: cartId,
    });

    res.json({
      success: true,
      message: "Đã xóa sản phẩm khỏi giỏ hàng!",
      data: deleteProduct,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteAddToCartProduct;
