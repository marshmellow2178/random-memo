import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {createAxiosInstance} from "../api/axiosInstance"
import { createUser } from "../api/user";

function Signup(){

    const [id, setId] = useState("");
    const [pw1, setPw1] = useState("");
    const [pw2, setPw2] = useState("");

    const navigate = useNavigate();
    const axiosInstance = createAxiosInstance(navigate);

    function handleSubmit(event){
        event.preventDefault();
        createUser(axiosInstance, id, pw1, pw2)
        .then((res)=>{
            if(res.status == 201){
                navigate('/login');
            }
        })
        .catch(console.error);
    }

    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label>ID</label>
                <input type="text" 
                onChange={(e)=>setId(e.target.value)}
                required/>

                <label>PW</label>
                <input type="password" 
                onChange={(e)=>setPw1(e.target.value)}
                required/>

                <label>PW check</label>
                <input type="password" 
                onChange={(e)=>setPw2(e.target.value)}
                required/>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
export default Signup;