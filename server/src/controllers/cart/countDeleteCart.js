const addToCartModel = require("../../models/cart");

const countDeleteCart = async (req, res) => {
  try {
    const { cartId } = req.body;

    // Tìm sản phẩm trong giỏ hàng
    const isProductAvailable = await addToCartModel.findOne({ _id: cartId });

    if (!isProductAvailable) {
      return res.json({
        success: false,
        message: "Sản phẩm không tồn tại trong giỏ hàng!",
        data: {},
      });
    }

    // Kiểm tra số lượng hiện tại
    if (isProductAvailable.quantity <= 1) {
      // Nếu số lượng là 1 hoặc ít hơn, xóa sản phẩm khỏi giỏ hàng
      await addToCartModel.deleteOne({ cartId });

      return res.json({
        success: true,
        message: "Sản phẩm đã bị xóa khỏi giỏ hàng!",
        data: null,
      });
    }

    // Nếu số lượng lớn hơn 1, giảm số lượng đi 1
    const updatedCart = await addToCartModel.findOneAndUpdate(
      { _id: cartId },
      { $inc: { quantity: -1 } }, // Giảm số lượng đi 1
      { new: true }
    );

    return res.json({
      success: true,
      message: "Đã giảm số lượng sản phẩm!",
      data: updatedCart,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      data: {},
      success: false,
    });
  }
};

module.exports = countDeleteCart;
