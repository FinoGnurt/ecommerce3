const userModel = require("../../models/user");
const { checkPassword } = require("../../helpers/bcryptPassword");
const {
  tokenOption,
  createAccessToken,
  createRefreshToken,
} = require("../../helpers/createJWT");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user inputs
    if (!email) throw new Error("Vui lòng nhập email!");
    if (!password) throw new Error("Vui lòng nhập mật khẩu!");

    // find email,  select 1 field (password)
    const user = await userModel.findOne({ email });

    if (!user) throw new Error("Tên tài khoản hoặc mật khẩu không đúng!");

    const resultCheck = await checkPassword(password, user.password);

    if (resultCheck) {
      const data = {
        _id: user._id,
        role: user.role,
      };

      // Create and send token
      const accessToken = createAccessToken(data);
      const refreshToken = createRefreshToken(data);

      // Add refresh token to db
      await userModel.findOneAndUpdate({ email }, { refreshToken });

      // Gửi Access Token cho client (có thể gửi qua JSON hoặc cookie)
      res.cookie("refreshToken", refreshToken, tokenOption); // Lưu Refresh Token trong cookie

      res.status(200).json({
        message: "Đăng nhập thành công!",
        accessToken,
        success: true,
      });
    } else {
      throw new Error("Tên tài khoản hoặc mật khẩu không đúng!");
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      message: err.message || err,
    });
  }
};

module.exports = signIn;
