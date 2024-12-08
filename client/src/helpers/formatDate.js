const formatDateDetail = (date) => {
  // Giả sử ngày trong UTC là: '2024-12-01T10:39:20.561+00:00'
  const utcDate = new Date(date);

  // Chuyển đổi sang giờ Việt Nam (GMT+7) và không lấy số giây
  const vnDate = utcDate.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false, // Sử dụng 24 giờ
    hour: "2-digit", // Hiển thị giờ dưới dạng 2 chữ số
    minute: "2-digit", // Hiển thị phút dưới dạng 2 chữ số
    // second: "2-digit", // Hiển thị giây dưới dạng 2 chữ số
    year: "numeric", // Hiển thị năm
    month: "2-digit", // Hiển thị tháng
    day: "2-digit", // Hiển thị ngày
  });

  return vnDate.replace(/:\d{2}$/, ""); // Loại bỏ phần giây
};

const formatDateNoDetail = (date) => {
  // Giả sử ngày trong UTC là: '2024-12-01T10:39:20.561+00:00'
  const utcDate = new Date(date);

  // Chuyển đổi sang giờ Việt Nam (GMT+7) và không lấy số giây
  const vnDate = utcDate.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false, // Sử dụng 24 giờ
    // hour: "2-digit", // Hiển thị giờ dưới dạng 2 chữ số
    // minute: "2-digit", // Hiển thị phút dưới dạng 2 chữ số
    // second: "2-digit", // Hiển thị giây dưới dạng 2 chữ số
    year: "numeric", // Hiển thị năm
    month: "2-digit", // Hiển thị tháng
    day: "2-digit", // Hiển thị ngày
  });

  return vnDate.replace(/:\d{2}$/, ""); // Loại bỏ phần giây
};

export { formatDateDetail, formatDateNoDetail };
