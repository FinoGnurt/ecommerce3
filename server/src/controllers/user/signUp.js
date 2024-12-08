const userModel = require("../../models/user");
const validateEmail = require("../../utils/checkEmail");
const { hashPassword } = require("../../helpers/bcryptPassword");

const signUp = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    // Validate user inputs
    if (!name) {
      throw new Error("Vui lòng nhập tên!");
    }
    if (!email) throw new Error("Vui lòng nhập email!");
    if (!password) throw new Error("Vui lòng nhập mật khẩu!");
    if (!validateEmail(email))
      throw new Error("Vui lòng nhập đúng định dạng email!");

    // Check if email already exists
    const existingEmail = await userModel.exists({ email });
    if (existingEmail) throw new Error("Email đã tồn tại!");

    // hash password
    const newPassword = await hashPassword(password);

    const createUser = await userModel.create({
      name,
      email,
      password: newPassword,
      avatar,
    });

    res.status(201).json({
      success: true,
      data: createUser,
      message: "Tạo tài khoản thành công!",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      message: err.message || err,
    });
  }
};

module.exports = signUp;
