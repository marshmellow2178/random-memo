import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMemo } from "../api/memo";
import { useAxios } from "../context/AxiosContext";

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
                onChange={(e)=>setTitle(e.target.value)} />
                <textarea
                required
                onChange={(e)=>setContent(e.target.value)} />
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    );
}
export default MemoForm;