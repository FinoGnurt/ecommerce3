const userModel = require("../../models/user");
const { checkPassword } = require("../../helpers/bcryptPassword");
const validateEmail = require("../../utils/checkEmail");

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, password, address, avatar, role } = req.body;

    // Validate user inputs (Ko nhập khoảng trắng, ko nhập dấu cách, nếu trường name = undefine thì bỏ qua check)
    if (
      (name !== undefined && !name) ||
      (name !== undefined && name.trim() === "")
    ) {
      throw new Error("Vui lòng nhập tên!");
    }
    if (
      (email !== undefined && !email) ||
      (email !== undefined && email.trim() === "")
    )
      throw new Error("Vui lòng nhập email!");
    if (
      (password !== undefined && !password) ||
      (password !== undefined && password.trim() === "")
    )
      throw new Error("Vui lòng nhập mật khẩu!");
    if (
      (email !== undefined && !email) ||
      (email !== undefined && !validateEmail(email))
    )
      throw new Error("Vui lòng nhập đúng định dạng email!");

    // Check if email already exists
    if (email && (await userModel.exists({ email })))
      throw new Error("Email đã tồn tại!");

    // Check sdt exists
    if (mobile && (await userModel.exists({ mobile }))) {
      throw new Error("Số điện thoại đã tồn tại!");
    }

    // tạo ra 1 obj mới nếu obj cũ có giá trị
    const dataOld = { name, email, mobile, password, address, avatar, role };
    let dataNew = {};

    // lấy các key có giá trị ko phải là null hoặc undefine
    for (let key in dataOld) {
      if (dataOld.hasOwnProperty(key)) {
        if (!(dataOld[key] === undefined || dataOld[key] === null)) {
          dataNew[key] = dataOld[key];
        }
      }
    }

    if (Object.keys(dataNew).length === 0 && dataNew.constructor === Object)
      throw new Error("Bạn chưa nhập thông tin!");

    const result = await userModel.findOneAndUpdate({ _id: id }, dataNew, {
      new: true,
    });

    res.status(200).json({
      message: "Cập nhật thành công!",
      data: result,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: {},
      message: err.message || err,
    });
  }
};

module.exports = updateUser;
