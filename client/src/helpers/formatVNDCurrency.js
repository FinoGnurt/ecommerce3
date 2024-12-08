const formatVNDCurrency = (number) => {
  if (isNaN(number)) {
    // throw new Error("Giá trị đầu vào phải là số.");
    return "";
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export { formatVNDCurrency };
