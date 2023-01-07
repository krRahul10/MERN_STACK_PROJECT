import { commonRequest } from "./ApiCall";
import  { BACKEND_URL} from "./helper"

export const registerFunction = async (data,header) => {
return await commonRequest("POST", `${BACKEND_URL}/user/register`,data,header)
}

export const getUserData = async (search) => {
    return await commonRequest("GET",`${BACKEND_URL}/user/details?search=${search}`,"")
}

export const getSingleUserData = async (id) => {
    return await commonRequest("GET",`${BACKEND_URL}/userprofile/${id}`,"")
}

export const  editFunction = async (id,data,header) => {
    return await commonRequest("PUT",`${BACKEND_URL}/user/edit/${id}`, data, header)
}
export const  deleteFunction = async (id) => {
    return await commonRequest("DELETE",`${BACKEND_URL}/user/delete/${id}`, {})
}