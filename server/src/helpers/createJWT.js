const jwt = require("jsonwebtoken");

// token
const createAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: 1 * 24 * 60 * 60,
  });

const createRefreshToken = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: "30s" });

// cookie
const tokenOption = {
  httpOnly: true, // Không cho phép JavaScript truy cập cookie (bảo vệ khỏi XSS)
  secure: true, // Cookie chỉ gửi qua kết nối HTTPS (bảo vệ khỏi MITM)
  maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie hết hạn sau 7 ngày
};

module.exports = { tokenOption, createAccessToken, createRefreshToken };
