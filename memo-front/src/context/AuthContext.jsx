import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

    useEffect(()=>{
        const handleStorage=()=>{
            setIsLoggedIn(!!localStorage.getItem("accessToken"));
        };
        window.addEventListener('storage', handleStorage);
        return () =>
            window.removeEventListener('storage', handleStorage);
    },[]);

    return(
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
}