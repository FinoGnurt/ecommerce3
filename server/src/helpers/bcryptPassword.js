const bcrypt = require("bcrypt");
const saltRounds = 10;
const someOtherPlaintextPassword = "123";

const hashPassword = (password) => {
  return bcrypt.hash(password, saltRounds);
};

const checkPassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

module.exports = { hashPassword, checkPassword };
