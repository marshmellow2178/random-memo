import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMemo, updateMemo } from "../api/memo";
import { useAxios } from "../context/AxiosContext";
import MemoForm from "./MemoForm";

function MemoEdit(){
    const navigate = useNavigate();
    const axios = useAxios();
    const {id} = useParams();
    const [memo, setMemo] = useState({});

    useEffect(()=>{
        getMemo(axios, id)
        .then((res)=>{
           setMemo(res.data);
        })
    }, [])

    const handleSubmit = async (data) => {
        await updateMemo(axios, data, id);
        navigate(`/memos/${id}`);
    };

    return <MemoForm 
    initData={memo}
    onSubmit={handleSubmit} 
    buttonText="UPDATE" />;
}
export default MemoEdit;