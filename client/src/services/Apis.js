import { commonRequest } from "./ApiCall";
import { BACKEND_URL } from "./helper";

export const registerFunction = async (data, header) => {
  return await commonRequest(
    "POST",
    `${BACKEND_URL}/user/register`,
    data,
    header
  );
};

export const getUserData = async (search, gender, status, sort, page) => {
  return await commonRequest(
    "GET",
    `${BACKEND_URL}/user/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,
    ""
  );
};

export const getSingleUserData = async (id) => {
  return await commonRequest("GET", `${BACKEND_URL}/userprofile/${id}`, "");
};

export const editFunction = async (id, data, header) => {
  return await commonRequest(
    "PUT",
    `${BACKEND_URL}/user/edit/${id}`,
    data,
    header
  );
};
export const deleteFunction = async (id) => {
  return await commonRequest("DELETE", `${BACKEND_URL}/user/delete/${id}`, {});
};

export const statusChangeFunction = async (id, data) => {
  return await commonRequest("PUT", `${BACKEND_URL}/user/status/${id}`, {
    data,
  });
};

export const exportToCsvFunction = async () => {
  return await commonRequest("GET", `${BACKEND_URL}/userexport`, "");
};
