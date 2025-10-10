import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {createAxiosInstance} from "../api/axiosInstance"
import { createUser } from "../api/user";
import { useAxios } from "../context/AxiosContext";
import Form from "../components/ui/Form";
import Input from "../components/ui/Input";

function Signup(){

    const [id, setId] = useState("");
    const [pw1, setPw1] = useState("");
    const [pw2, setPw2] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();
    const axios = useAxios();

    function handleSubmit(event){
        event.preventDefault();
        createUser(axios, id, pw1, pw2, email)
        .then((res)=>{
            if(res.status == 201){
                navigate('/login');
            }
        })
        .catch(console.error);
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Input type="text" 
            placeholder="ID"
            onChange={(e)=>setId(e.target.value)}
            required/>

            <Input type="password" 
            placeholder="PW"
            onChange={(e)=>setPw1(e.target.value)}
            required/>

            <Input type="password" 
            placeholder="PW check"
            onChange={(e)=>setPw2(e.target.value)}
            required/>

            <Input type="email"
            placeholder="email@example.com"
            onChange={(e)=>setEmail(e.target.value)}
            required />

            <Input type="submit" value="Sign Up" />
        </Form>
    );
}
export default Signup;