import axios from "../axios";

const apiGetBrands = () =>
  axios({
    method: "GET",
    url: "/brands",
  });

const apiAddBrand = (accessToken, data) =>
  axios({
    method: "POST",
    url: "/brand",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

const apiUpdateBrand = (accessToken, paramsBrandId, data) =>
  axios({
    method: "PUT",
    url: `/brand/${paramsBrandId}`,
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

const apiDeleteBrand = (accessToken, paramsBrandId) =>
  axios({
    method: "DELETE",
    url: `/brand/${paramsBrandId}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export { apiGetBrands, apiAddBrand, apiUpdateBrand, apiDeleteBrand };
