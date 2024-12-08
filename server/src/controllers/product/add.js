const productModel = require("../../models/product");
const brandModel = require("../../models/brand");
const slugify = require("../../utils/slugify");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      images,
      brand,
      colors,
      information,
      description,
      bestSeller,
      rating,
    } = req.body;

    console.log({
      name,
      images,
      brand,
      colors,
      information,
      description,
      bestSeller,
      rating,
    });

    // Validate input
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

    // Kiểm tra xem product đã tồn tại chưa?
    const checkProduct = await productModel.exists({ name });
    if (checkProduct) throw new Error("Đã có sản phẩm này!");

    // Tạo slug cho product
    const slug = slugify(name);

    // Thêm product
    const product = await productModel.create({
      name,
      images,
      brand,
      colors,
      information,
      description,
      rating,
      slug,
    });

    res.status(201).json({
      success: true,
      data: product,
      message: "Thêm sản phẩm thành công!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: null, message: error.message || error });
  }
};

module.exports = addProduct;
