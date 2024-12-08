import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shopContext";
import { assets } from "../../assets/frontend_assets/assets";
import { ProductItem, Title } from "../../components";

const Products = () => {
  const { products, search, showSearch, brands } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [arrFilterBrand, setArrFilterBrand] = useState([]);
  const [sortType, setSortType] = useState("normal");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Số sản phẩm mỗi trang

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filterProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filterProducts.length / itemsPerPage);

  const renderPagination = () => (
    <div className="mt-5 flex justify-center">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`mx-1 border px-3 py-1 ${currentPage === index + 1 ? "bg-gray-300" : ""}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [sortType, arrFilterBrand, priceFilter]);

  const toggleBrand = (e) => {
    if (arrFilterBrand.includes(e.target.value)) {
      setArrFilterBrand((prev) =>
        prev.filter((item) => item !== e.target.value),
      );
    } else {
      setArrFilterBrand((prev) => [...prev, e.target.value]);
    }
  };

  const togglePriceFilter = (e) => {
    if (priceFilter.includes(e.target.value)) {
      setPriceFilter((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setPriceFilter((prev) => [...prev, e.target.value]);
    }
  };

  // SortProducts
  useEffect(() => {
    // Sao chép mảng sản phẩm ban đầu
    let productsCopy = [...products];

    // Xử lý sắp xếp theo sortType
    switch (sortType) {
      case "normal":
        break;
      case "low-high":
        productsCopy.sort(
          (a, b) => a.colors[0].sellingPrice - b.colors[0].sellingPrice,
        );
        break;
      case "high-low":
        productsCopy.sort(
          (a, b) => b.colors[0].sellingPrice - a.colors[0].sellingPrice,
        );
        break;
      case "newest":
        productsCopy.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        break;
      case "oldest":
        productsCopy.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
        break;
      default:
        break;
    }

    // Lọc theo thương hiệu nếu có
    if (arrFilterBrand.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        arrFilterBrand.includes(item.brand),
      );
    }

    if (priceFilter.length > 0) {
      productsCopy = productsCopy.filter((item) => {
        const price = item.colors[0].sellingPrice;
        return priceFilter.some((filter) => {
          switch (filter) {
            case "5000000":
              return price < 5000000;
            case "5000000-10000000":
              return price >= 5000000 && price < 10000000;
            case "10000000-15000000":
              return price >= 10000000 && price < 15000000;
            case "15000000-20000000":
              return price >= 15000000 && price < 20000000;
            case "20000000-25000000":
              return price >= 20000000 && price < 25000000;
            case "25000000-30000000":
              return price >= 25000000 && price < 30000000;
            case "30000000":
              return price > 30000000;
            default:
              return false;
          }
        });
      });
    }

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(search.toLowerCase().replace(/\s+/g, "")),
      );
    }

    setFilterProducts(productsCopy);
  }, [sortType, arrFilterBrand, priceFilter, products, search]);

  return (
    <div className="flex flex-col gap-1 border-t pt-10 sm:flex-row sm:gap-10">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          className="my-2 flex cursor-pointer items-center gap-2 text-xl md:cursor-default"
          onClick={() => setShowFilter(!showFilter)}
        >
          BỘ LỌC
          <img
            src={assets.dropdown_icon}
            className={`h-3 transition-all duration-300 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>

        {/* Brand Filter */}
        <div
          className={`mt-6 border border-gray-300 py-3 pl-5 sm:block ${showFilter ? "" : "hidden"}`}
        >
          <p className="mb-3 text-sm font-medium">THƯƠNG HIỆU</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {brands?.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={item.name}
                  className="checkbox h-4 w-4 rounded-[4px]"
                  onChange={toggleBrand}
                />
                <p className="flex gap-2 text-base capitalize">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div
          className={`my-5 border border-gray-300 py-3 pl-5 sm:block ${showFilter ? "" : "hidden"}`}
        >
          <p className="mb-3 text-sm font-medium">GIÁ TIỂN</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"5000000"}
                className="checkbox h-4 w-4 rounded-[4px]"
                onChange={togglePriceFilter}
              />
              &lt; 5.000.000đ
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"5000000-10000000"}
                className="checkbox h-4 w-4 rounded-[4px]"
                onChange={togglePriceFilter}
              />
              5.000.000đ - 10.000.000đ
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"10000000-15000000"}
                className="checkbox h-4 w-4 rounded-[4px]"
                onChange={togglePriceFilter}
              />
              10.000.000đ - 15.000.000đ
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"15000000-20000000"}
                className="checkbox h-4 w-4 rounded-[4px]"
                onChange={togglePriceFilter}
              />
              15.000.000đ - 20.000.000đ
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"20000000-25000000"}
                className="checkbox h-4 w-4 rounded-[4px]"
                onChange={togglePriceFilter}
              />
              20.000.000đ - 25.000.000đ
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"25000000-30000000"}
                className="checkbox h-4 w-4 rounded-[4px]"
                // onChange={togglePriceFilter}
              />
              25.000.000đ - 30.000.000đ
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"30000000"}
                className="checkbox h-4 w-4 rounded-[4px]"
                onChange={togglePriceFilter}
              />
              &gt; 30.000.000đ
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="mb-4 flex justify-between text-base sm:text-2xl">
          <Title text1={"TẤT CẢ"} text2={"SẢN PHẨM"} />

          {/* Product Sort */}
          <select
            className="cursor-pointer rounded-sm border-2 border-gray-300 px-2 text-sm"
            onChange={(e) => setSortType(e.target.value)}
            defaultValue={"normal"}
          >
            <option value="normal">Mặc định</option>
            <option value="low-high">Giá thấp đến cao</option>
            <option value="high-low">Giá cao đến thấp</option>
            <option value="newest">Sản phẩm mới nhất</option>
            <option value="oldest">Sản phẩm cũ nhất</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {filterProducts?.map((item, index) => (
            <ProductItem key={index} data={item} />
          ))}
        </div>

        {renderPagination()}
      </div>
    </div>
  );
};

export default Products;
