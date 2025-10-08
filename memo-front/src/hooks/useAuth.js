import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () =>{
    return useContext(AuthContext);
}
//const {isLoggedIn, setIsLoggedIn} = useAuth(); 어디서든 사용 가능 