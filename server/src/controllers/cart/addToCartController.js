const addToCartModel = require("../../models/cart");

const addToCartController = async (req, res) => {
  try {
    const { productId, colorId } = req.body;
    const { _id } = req.userAuth;

    console.log({ productId, colorId, _id });

    const isProductAvailable = await addToCartModel.findOne({
      productId,
      userId: _id,
      colorId,
    });

    console.log("isProductAvailable", isProductAvailable);

    if (isProductAvailable) {
      const add1ToCart = await addToCartModel.findOneAndUpdate(
        {
          productId,
          userId: _id,
          colorId,
        },
        { $inc: { quantity: 1 } },
        { new: true }
      );

      return res.json({
        success: true,
        message: "Tăng sản phẩm lên 1!",
        data: add1ToCart,
      });
    }

    const addToCart = await addToCartModel.create({
      productId,
      userId: _id,
      colorId,
      quantity: 1,
    });

    return res.json({
      data: addToCart,
      message: "Đã thêm sản phẩm vào giỏ hàng!",
      success: true,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      data: {},
      success: false,
    });
  }
};

module.exports = addToCartController;
