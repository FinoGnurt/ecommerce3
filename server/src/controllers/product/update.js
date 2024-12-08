const productModel = require("../../models/product");
const brandModel = require("../../models/brand");
const slugify = require("../../utils/slugify");

const getProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      images,
      brand,
      colors,
      information,
      description,
      rating,
      bestSeller,
    } = req.body;

    if (
      !name ||
      !images ||
      !brand ||
      !colors ||
      !information ||
      !Array.isArray(images) ||
      !Array.isArray(colors)
    )
      throw new Error("Vui lòng nhập đầy đủ thông tin!");

    // Kiểm tra xem brand có hợp lệ không
    const validBrand = await brandModel.findOne({ name: brand });
    if (!validBrand) throw new Error("Brand không hợp lệ.");

    const slug = slugify(name);

    // Thêm product
    const product = await productModel.findByIdAndUpdate(
      { _id: id },
      {
        name,
        images,
        brand,
        colors,
        information,
        description,
        rating,
        slug,
        bestSeller,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      data: product,
      message: "Cập nhật sản phẩm thành công!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: null, message: error.message || error });
  }
};

module.exports = getProducts;
