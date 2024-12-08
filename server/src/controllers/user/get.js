const userModel = require("../../models/user");

const userLogout = async (req, res) => {
  try {
    const { id } = req.query;

    const user = id
      ? await userModel.findOne({ _id: id })
      : await userModel.find();

    res.status(201).json({
      success: true,
      data: user,
      message: "Lấy thông tin thành công!",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      message: err.message || err,
    });
  }
};

module.exports = userLogout;
