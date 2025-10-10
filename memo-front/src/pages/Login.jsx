import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/user";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../context/AxiosContext";
import Input from "../components/ui/Input";
import Form from "../components/ui/Form";

function Login(){
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const {isLoggedIn, setIsLoggedIn} = useAuth();
   
    const navigate = useNavigate();
    const axios = useAxios();

    function handleSubmit(event){
        event.preventDefault();
        login(axios, id, pw)
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
        <Form
        onSubmit={handleSubmit}>
            <Input type="text" 
            onChange={(e)=>setId(e.target.value)}
            placeholder="ID"
            required />

            <Input type="password"
            onChange={(e)=>setPw(e.target.value)}
            placeholder="PW"
            required />

            <Input type="submit" value="LOGIN" />
        </Form>
    );
}
export default Login;