const brandModel = require("../../models/brand");

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) throw new Error("Missing input id brand!!!");
    if (!name) throw new Error("Không được để trống tên thương hiệu!");

    const brand = await brandModel.findByIdAndUpdate(
      { _id: id },
      { name },
      { new: true }
    );

    res.status(201).json({
      success: true,
      data: brand,
      message: "Cập nhật thương hiệu thành công.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: null, message: error.message });
  }
};

module.exports = updateBrand;
