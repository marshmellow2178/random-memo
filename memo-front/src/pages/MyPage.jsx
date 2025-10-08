import { useEffect, useState } from "react";
import { getUser } from "../api/user";
import { useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../api/axiosInstance";

function MyPage(){
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const axiosInstance = createAxiosInstance(navigate);

    useEffect(()=>{
        getUser(axiosInstance)
        .then((res)=>{
            setUser(res.data);
        })
        .catch(console.error);
    }, [])
    return (
        <div className="container">
            <p>Hello, {user.username}</p>
            <span>가입일: {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
    );
}
export default MyPage;