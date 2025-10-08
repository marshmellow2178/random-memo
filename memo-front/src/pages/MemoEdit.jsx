import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMemo, updateMemo } from "../api/memo";
import { createAxiosInstance } from "../api/axiosInstance";

function MemoEdit(){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("NORMAL");

    const navigate = useNavigate();
    const axiosInstance = createAxiosInstance(navigate);
    const {id} = useParams();

    useEffect(()=>{
        getMemo(axiosInstance, id)
        .then((res)=>{
            setTitle(res.data.title);
            setContent(res.data.content);
            setStatus(res.data.status);
        })
    }, [])

    function handleSubmit(event){
        event.preventDefault();
        updateMemo(axiosInstance, id, title, content, status)
        .then((res)=>{
            if(res.status == 200){
                navigate(`/memos/${id}`);
            }
        })
        .catch(console.error);
    }

    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input type="text"
                value={title}
                required
                onChange={(e)=>setTitle(e.target.value)} />
                <select
                value={status}
                onChange={(e)=>setStatus(e.target.value)}>
                    <option value={"NORMAL"}>일반</option>
                    <option value={"PINNED"}>중요</option>
                    <option value={"DONE"}>완료</option>
                </select>
                <textarea
                value={content}
                required
                onChange={(e)=>setContent(e.target.value)} />
                <button type="submit">UPDATE</button>
            </form>
        </div>
    );
}
export default MemoEdit;