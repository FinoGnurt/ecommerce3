import axios from "../axios";

const apiAddToCart = (accessToken, productId, colorId) =>
  axios({
    method: "POST",
    url: "/cart/add-to-cart",
    headers: { Authorization: `Bearer ${accessToken}` },
    data: { productId, colorId },
  });

const apiGetCart = (accessToken, userId) =>
  axios({
    method: "GET",
    url: "/cart/get-cart",
    headers: { Authorization: `Bearer ${accessToken}` },
    data: userId,
  });

const apiDeleteCart = (accessToken, cartId) =>
  axios({
    method: "DELETE",
    url: "/cart/delete-cart",
    headers: { Authorization: `Bearer ${accessToken}` },
    data: { cartId },
  });

// subtract and delete
const apiCountDeleteCart = (accessToken, cartId) =>
  axios({
    method: "POST",
    url: "/cart/count-delete-cart",
    headers: { Authorization: `Bearer ${accessToken}` },
    data: { cartId },
  });

export { apiAddToCart, apiGetCart, apiDeleteCart, apiCountDeleteCart };
