// const orderModel = require("../../models/");
const { default: axios } = require("axios");
const CryptoJS = require("crypto-js");
const moment = require("moment");
const { config } = require("../../config/configPayment");

const createPayment = async (req, res) => {
  const currentUser = req.userAuth;
  const { products, allQuantity, allTotalPrice, redirectUrl } = req.body;

  if (
    !products ||
    products.length === 0 ||
    !allQuantity ||
    !allTotalPrice ||
    !currentUser
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong!" });
  }

  const embed_data = { redirecturl: redirectUrl || process.env.FRONTEND_URL };

  const transID = Math.floor(Math.random() * 1000000);
  const app_trans_id = `${moment().format("YYMMDD")}_${transID}`;

  // const createData = await orderModel.create({
  //   userId: currentUser,
  //   products,
  //   allQuantity,
  //   allTotalPrice,
  //   transactionCode: app_trans_id,
  // });

  const items = [createData];

  const order = {
    app_id: config.app_id,
    app_trans_id: app_trans_id, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: "user123",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: allTotalPrice,
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "",
    callback_url: `${process.env.CALLBACK_URL_PAYMENT}/api/callback`,
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data =
    config.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const result = await axios.post(`${config.endpoint}/create`, null, {
      params: order,
    });

    // Gửi dữ liệu đến callback URL
    // await axios.post(order.callback_url, { data: createData });

    return res.json({
      success: true,
      message: result.data.return_message,
      urlPayment: result.data.order_url,
      data: createData,
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ success: false, message: "Payment failed" });
  }
};

module.exports = createPayment;

// Node: nếu dùng axios sẽ chạy trước callback_url vì callback_url sẽ được chạy khi thanh toán thành công, nếu không thành công sẽ không chạy
