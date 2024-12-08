const brandModel = require("../../models/brand");

const addBrand = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) throw new Error("Vui lòng nhập tên thương hiệu.");

    const existingBrand = await brandModel.findOne({ name });
    if (existingBrand) throw new Error("Thương hiệu này đã tồn tại.");

    const brand = await brandModel.create({ name });

    res.status(201).json({
      success: true,
      data: brand,
      message: "Thêm mới thương hiệu thành công.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: null, message: error.message });
  }
};

module.exports = addBrand;
