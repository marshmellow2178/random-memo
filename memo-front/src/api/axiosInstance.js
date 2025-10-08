import axios from "axios";
import { useNavigate } from "react-router-dom";

export const createAxiosInstance = (navigate) =>{
    const instance = axios.create({
        baseURL: "http://localhost:8080/api",
        headers: {
            'Content-Type': "application/json",
        },
    });

    instance.interceptors.request.use((config)=>{
        const token = localStorage.getItem("accessToken");
        if(token) config.headers.Authorization = token;
        return config;
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if(error.response?.status === 401){
                localStorage.removeItem("accessToken");
                navigate("/login");
            }
            return Promise.reject(error);
        }
    );

    return instance;
};
