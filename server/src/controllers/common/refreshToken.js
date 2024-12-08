const userModel = require("../../models/user");
const jwt = require("jsonwebtoken");

// Cấp lại access token khi access token hết hạn
const recreateAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new Error("Không có refresh token!");

    const userRefreshToken = await userModel.findOne({ refreshToken });
    if (!userRefreshToken) throw new Error("Không tìm thấy refresh token!");

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    console.log("decoded: ", decoded); // bar

    const { iat, exp, ...payload } = decoded;

    const newAccessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.log("error auth: ", err.message);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = recreateAccessToken;
