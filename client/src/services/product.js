import axios from "../axios";

const apiAddProduct = (data, accessToken) =>
  axios({
    method: "POST",
    url: "/product",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

const apiGetProducts = () =>
  axios({
    method: "GET",
    url: "/products",
  });

const apiDeleteProduct = (accessToken, productId) =>
  axios({
    method: "DELETE",
    url: `/product/${productId}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

const apiUpdateProduct = (accessToken, productId, data) =>
  axios({
    method: "PATCH",
    url: `/product/${productId}`,
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

export { apiAddProduct, apiGetProducts, apiDeleteProduct, apiUpdateProduct };
