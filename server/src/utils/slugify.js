function slugify(str) {
  // Convert to lowercase
  str = str.toLowerCase();

  // Replace 'đ' with 'd'
  str = str.replace(/đ/g, "d");

  // Replace accented characters with their non-accented equivalents
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Replace spaces and special characters with a hyphen
  str = str
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen

  // Trim hyphens from the start and end
  return str.replace(/^-+|-+$/g, "");
}

module.exports = slugify;
