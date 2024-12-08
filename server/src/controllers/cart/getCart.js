const Cart = require("../../models/cart");
const Product = require("../../models/product");

const getCart = async (req, res) => {
  try {
    const { _id } = req.userAuth;

    // Tìm các cart của user
    const carts = await Cart.find({ userId: _id })
      .populate({
        path: "productId",
        model: Product,
        select: "-__v -createdAt -updatedAt",
      })
      .lean(); // Lấy dữ liệu dưới dạng object

    // Lọc color dựa trên colorId
    const result = carts.map((cart) => {
      if (cart.productId && cart.productId.colors) {
        cart.productId.colors = cart.productId.colors.filter(
          (color) => color._id.toString() === cart.colorId
        );
      }
      return cart;
    });

    res.status(200).json({
      success: true,
      message: "Lấy dữ liệu giỏ hàng thành công!",
      data: result,
    }); // Trả về kết quả
  } catch (error) {
    console.error("Error fetching cart with filtered colors:", error);
    res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

module.exports = getCart;
