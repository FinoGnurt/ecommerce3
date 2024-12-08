const brandModel = require("../../models/brand");

const getBrands = async (req, res) => {
  try {
    const brand = await brandModel.find().select("_id name");

    res.status(201).json({
      success: true,
      data: brand,
      message: "Lấy tên thương hiệu thành công.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: null, message: error.message });
  }
};

module.exports = getBrands;
