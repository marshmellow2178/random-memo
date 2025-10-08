import { createContext, useContext } from "react"
import { createAxiosInstance } from "../api/axiosInstance";

const AxiosContext = createContext();

export function AxiosProvider({children, navigate}){
    const axiosInstance = createAxiosInstance(navigate);
    return <AxiosContext.Provider
    value={axiosInstance}>{children}
    </AxiosContext.Provider>;
}

export function useAxios(){
    return useContext(AxiosContext);
}