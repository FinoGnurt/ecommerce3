const jwt = require("jsonwebtoken");

// middleware để kiểm tra access token
const authToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) throw new Error("Invalid authorization header");

    // Bearer [token]
    const token = authorizationHeader.split(" ")[1];
    if (!token) throw new Error("Vui lòng đăng nhập...");

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err) throw new Error("Token không hợp lệ...");

      req.userAuth = decode;

      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: null,
      success: false,
    });
  }
};

module.exports = authToken;
