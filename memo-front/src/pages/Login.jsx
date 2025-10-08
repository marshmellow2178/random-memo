import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../api/axiosInstance";
import { login } from "../api/user";
import { useAuth } from "../hooks/useAuth";

function Login(){
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const {isLoggedIn, setIsLoggedIn} = useAuth();
   
    const navigate = useNavigate();
    const axiosInstance = createAxiosInstance(navigate);

    function handleSubmit(event){
        event.preventDefault();
        login(axiosInstance, id, pw)
        .then(res=>{
            if(res.status==200){
                localStorage.setItem("accessToken", "Bearer "+res.data.accessToken);
                setIsLoggedIn(true);
                navigate("/memos");
            }
        })
        .catch(console.error);
    }

    return(
        <div className="container">
            <form
            onSubmit={handleSubmit}>
                <label>ID</label>
                <input type="text" 
                onChange={(e)=>setId(e.target.value)}
                required />

                <label>PW</label>
                <input type="password"
                onChange={(e)=>setPw(e.target.value)}
                required />

                <button type="submit">LOGIN</button>
            </form>
        </div>
    );
}
export default Login;