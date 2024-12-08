import axios from "../axios";

const apiSignIn = (data) =>
  axios({
    method: "POST",
    url: "/signin",
    data,
  });

const apiSignUp = (data) =>
  axios({
    method: "POST",
    url: "/signup",
    data,
  });

const apiLogout = () =>
  axios({
    method: "GET",
    url: "/logout",
  });

const apiUpdateUser = (accessToken, id, data) =>
  axios({
    method: "PATCH",
    url: `/user/${id}`,
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

const apiGetUser = (accessToken, userId) =>
  axios({
    method: "GET",
    url: "/user",
    headers: { Authorization: `Bearer ${accessToken}` },
    params: userId ? { id: userId } : null,
  });

const apiDeleteUser = (accessToken, userId) =>
  axios({
    method: "DELETE",
    url: `/user/${userId}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export {
  apiSignIn,
  apiSignUp,
  apiLogout,
  apiUpdateUser,
  apiGetUser,
  apiDeleteUser,
};
