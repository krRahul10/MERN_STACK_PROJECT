import { commonRequest } from "./ApiCall";
import  { BACKEND_URL} from "./helper"

export const registerFunction = async (data,header) => {
return await commonRequest("POST", `${BACKEND_URL}/user/register`,data,header)
}