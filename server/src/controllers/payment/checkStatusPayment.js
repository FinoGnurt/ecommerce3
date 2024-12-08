const axios = require("axios").default; // npm install axios
const CryptoJS = require("crypto-js"); // npm install crypto-js
const qs = require("qs");
const { config } = require("../../config/configPayment");

// body: {app_trans_id:""}
const checkStatusPayment = async (req, res) => {
  //   const app_trans_id = req.params.app_trans_id;
  const { app_trans_id } = req.body;

  if (!app_trans_id) {
    return res.status(400).json({ message: "Missing app_trans_id" });
  }

  let postData = {
    app_id: config.app_id,
    app_trans_id: app_trans_id, // Input your app_trans_id
  };

  let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  let postConfig = {
    method: "post",
    url: `${config.endpoint}/query`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(postData),
  };

  try {
    const result = await axios(postConfig);
    return res.json(result.data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = checkStatusPayment;
