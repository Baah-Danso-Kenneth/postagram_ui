import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getAccessToken, getRefreshToken } from "../hooks/user.action";


const axiosService = axios.create({
    baseURL:"http://localhost:8000",

    headers:{
        "Content-Type":"application/json"
    }
})

axiosService.interceptors.request.use(async (config)=>{
    config.headers.Authorization= `Bearer ${getAccessToken()}`;

    return config

})

axiosService.interceptors.response.use(
    (res)=>Promise.resolve(res),
    (err)=>Promise.reject(err)
)


const refreshAuthLogic = async (faileRequest)=>{
    return axios.post("/refresh/token/", null,{
        baseURL:"http://localhost:8000",
        headers:{
            Authorization:`Bearer ${getRefreshToken()}`
        }
    })
    .then((resp)=>{
        const {access, refresh,user} = resp.data
        faileRequest.response.config.headers["Authorization"] = "Bearer " + access;
        localStorage.setItem("auth", JSON.stringify({
            access, refresh,user
        }))
    })
    .catch(()=>{
        localStorage.removeItem("auth")
    })
}


createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export function fetcher(url){
    return axiosService.get(url)
}

