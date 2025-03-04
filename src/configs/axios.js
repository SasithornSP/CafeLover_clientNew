import axios from "axios";
import useUserStore from "../stores/userStores";
import { use } from "react";

const baseUrl = "http://localhost:8900";

axios.defaults.baseURL = baseUrl;

//get token from store
const getAccessToken =()=>{
    return useUserStore.getState().token
}

//add token to header
axios.interceptors.request.use(
    (config)=>{
        const token = getAccessToken()
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

//refresh token
axios.interceptors.response.use(
    (response)=>{
        return response
    },
    async (error)=>{
        const originalRequest = error.config
        if(error.response.status === 401 && !originalRequest._retry){
            useUserStore.getState().actionLogout()
            window.location.href = '/'
        }
        return Promise.reject(error)
    }
)

export default axios;