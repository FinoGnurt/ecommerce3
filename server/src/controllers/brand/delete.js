const brandModel = require("../../models/brand");

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Missing input id brand!!!");

    const brand = await brandModel.findByIdAndDelete({ _id: id });

    res.status(201).json({
      success: true,
      data: brand,
      message: "Đã xóa tên thương hiệu.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: null, message: error.message });
  }
};

module.exports = deleteBrand;
