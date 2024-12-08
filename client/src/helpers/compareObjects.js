function getDifferences(obj1, obj2) {
  let result = {};

  // Lấy tất cả các key của obj1 và obj2
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  // Duyệt qua tất cả các key để so sánh
  allKeys.forEach((key) => {
    if (obj1[key] !== obj2[key]) {
      // Nếu giá trị trong obj1 khác obj2, thêm vào result từ obj2
      result[key] = obj2[key];
    }
  });

  return result;
}

export { getDifferences };

// Nếu bạn chỉ muốn lấy những giá trị khác giữa hai đối tượng obj1 và obj2 (cụ thể là lấy giá trị từ obj2 nếu có sự khác biệt so với obj1), bạn có thể làm theo cách sau:

// Mục tiêu:
// So sánh các thuộc tính trong obj1 và obj2.
// Nếu giá trị của một thuộc tính trong obj1 khác với obj2, thì lấy giá trị của thuộc tính đó từ obj2 và thêm vào một đối tượng mới.
