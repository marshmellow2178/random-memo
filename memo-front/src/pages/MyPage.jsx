import { useEffect, useState } from "react";
import { getUser } from "../api/user";
import { useAxios } from "../context/AxiosContext";

function MyPage(){
    const [user, setUser] = useState({});
    const axios = useAxios();

    useEffect(()=>{
        getUser(axios)
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