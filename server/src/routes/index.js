const express = require("express");
const router = express.Router();

// JWT
const authToken = require("../middlewares/authToken");
const refreshToken = require("../controllers/common/refreshToken");

// user
const userSignUp = require("../controllers/user/signUp");
const userSignIn = require("../controllers/user/signIn");
const userLogout = require("../controllers/user/logout");
const updateUser = require("../controllers/user/update");
const getUser = require("../controllers/user/get");
const deleteUser = require("../controllers/user/delete");

// brand
const addBrand = require("../controllers/brand/add");
const getBrands = require("../controllers/brand/get");
const updateBrand = require("../controllers/brand/update");
const deleteBrand = require("../controllers/brand/delete");

// product
const addProduct = require("../controllers/product/add");
const getProducts = require("../controllers/product/get");
const updateProduct = require("../controllers/product/update");
const deleteProduct = require("../controllers/product/delete");

// cart
const addToCart = require("../controllers/cart/addToCartController");
const countDeleteCart = require("../controllers/cart/countDeleteCart");
const deleteAddToCartProduct = require("../controllers/cart/deleteAddToCartProduct");
const getCart = require("../controllers/cart/getCart");

// payment
// const createPayment = require("../controllers/payment/createPayment");
// const callbackPayment = require("../controllers/payment/callbackPayment");
// const checkStatusPayment = require("../controllers/payment/checkStatusPayment");

// refresh token
router.post("/refresh-token", refreshToken);

// user
router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.get("/logout", userLogout);
router.patch("/user/:id", updateUser);
router.get("/user", getUser);
router.delete("/user/:id", deleteUser);

// brand
router.post("/brand", [authToken], addBrand); // add brand
router.get("/brands", getBrands); // get brand
router.put("/brand/:id", [authToken], updateBrand); // update brand
router.delete("/brand/:id", [authToken], deleteBrand); // delete brand

// product
router.post("/product", addProduct); // add product
router.get("/products", getProducts); // get products
router.patch("/product/:id", updateProduct); // update product
router.delete("/product/:id", deleteProduct); // delete product

// cart
router.post("/cart/add-to-cart", [authToken], addToCart); // delete product
router.post("/cart/count-delete-cart", [authToken], countDeleteCart); // delete product
router.delete("/cart/delete-cart", [authToken], deleteAddToCartProduct); // delete product
router.get("/cart/get-cart", [authToken], getCart); // delete product

// payment
// router.post("/create-payment", authToken, createPayment);
// router.post("/callback", callbackPayment);
// router.post("/check-status-payment", authToken, checkStatusPayment);

module.exports = router;
