const check2Obj = (obj1, obj2) => {
  let result = {};

  for (let key in obj2) {
    // Use Object.prototype.hasOwnProperty.call to avoid directly using obj2.hasOwnProperty
    if (
      Object.prototype.hasOwnProperty.call(obj2, key) &&
      obj1[key] !== obj2[key]
    ) {
      if (
        Object.prototype.hasOwnProperty.call(obj2, key) &&
        obj1[key] !== obj2[key] &&
        obj2[key] !== "" && // Kiểm tra nếu giá trị trong obj2 không phải là chuỗi rỗng
        obj2[key] !== null && // Kiểm tra nếu giá trị trong obj2 không phải là null
        obj2[key] !== undefined // Kiểm tra nếu giá trị trong obj2 không phải là undefined
      ) {
        result[key] = obj2[key]; // Nếu khác nhau, thêm vào result
      }
    }
  }

  return result;
};

export { check2Obj };

// kiểm tra 2 obj, nếu obj2 khác obj1 thì trả về những giá trị khác của obj2 (chỉ trả về những gía trị ko rỗng)
