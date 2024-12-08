// const orderModel = require("../../models/orderModel");
const addToCartModel = require("../../models/cartProduct");
const CryptoJS = require("crypto-js"); // npm install crypto-js
const { config } = require("../../config/configPayment");

const callbackPayment = async (req, res) => {
  let result = {};

  try {
    let dataStr = req.body.data; // return toàn bộ obj order

    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng
      let dataJson = JSON.parse(dataStr, config.key2);
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson["app_trans_id"]
      );

      // convert data
      const dataOrder = JSON.parse(JSON.parse(dataStr).item);

      // cập nhật trạng thái thanh toán
      await orderModel.findOneAndUpdate(
        {
          _id: dataOrder[0]._id,
          transactionCode: dataOrder[0].transactionCode,
        },
        { statusPayment: "Đã thanh toán" }
      );

      // xóa sp trong cart
      await addToCartModel.deleteMany({
        userId: dataOrder[0].userId,
        $or: dataOrder[0].products?.map((productId) => ({
          productId: productId.productId,
        })),
      });

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  console.log(result);
  res.json(result);
};

module.exports = callbackPayment;
