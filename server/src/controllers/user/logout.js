const userModel = require("../../models/user");

const userLogout = async (req, res) => {
  try {
    await userModel.updateOne(
      { refreshToken: req.cookies?.refreshToken },
      { $unset: { refreshToken: 1 } },
      { upsert: false }
    );

    res.clearCookie("refreshToken");

    res.status(201).json({
      success: true,
      data: null,
      message: "Đăng xuất tài khoản thành công!",
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
