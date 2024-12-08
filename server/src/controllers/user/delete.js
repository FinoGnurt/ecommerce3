const userModel = require("../../models/user");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findByIdAndDelete({ _id: id });

    res.status(201).json({
      success: true,
      data: user,
      message: "Đã xóa người dùng thành công!",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      message: err.message || err,
    });
  }
};

module.exports = deleteUser;
