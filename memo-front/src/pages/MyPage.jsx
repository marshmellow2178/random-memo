import { useEffect, useState } from "react";
import { getUser } from "../api/user";
import { useAxios } from "../context/AxiosContext";
import Card from "../components/ui/Card";

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
        <Card className="p-6 space-y-6">
            <p>Hello, {user.username}</p>
            <p>Email: {user.email}</p>
            <span>가입일: {new Date(user.createdAt).toLocaleDateString()}</span>
        </Card>
    );
}
export default MyPage;