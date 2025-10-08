import { useState } from "react";
import { useAxios } from "../context/AxiosContext";
import { createMemo } from "../api/memo";
import { useNavigate } from "react-router-dom";

function MemoForm(){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();
    const axios = useAxios();

    function handleSubmit(event){
        event.preventDefault();
        createMemo(axios, title, content)
        .then((res)=>{
            if(res.status == 201){
                navigate("/memos");
            }
        })
        .catch(console.error);
    }

    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input type="text"
                required
                placeholder="제목"
                onChange={(e)=>setTitle(e.target.value)} />
                <textarea
                required
                placeholder="내용"
                onChange={(e)=>setContent(e.target.value)} />
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    );
}
export default MemoForm;