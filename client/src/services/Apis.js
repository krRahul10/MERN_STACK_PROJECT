import { commonRequest } from "./ApiCall";
import  { BACKEND_URL} from "./helper"

export const registerFunction = async (data,header) => {
return await commonRequest("POST", `${BACKEND_URL}/user/register`,data,header)
}

export const getUserData = async () => {
    return await commonRequest("GET",`${BACKEND_URL}/user/details`,"")
}

export const getSingleUserData = async (id) => {
    return await commonRequest("GET",`${BACKEND_URL}/userprofile/${id}`,"")
}