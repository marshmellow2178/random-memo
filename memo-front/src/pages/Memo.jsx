import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {getMemo, deleteMemo} from "../api/memo"
import {createAxiosInstance} from "../api/axiosInstance"

function Memo(){
    const {id} = useParams();
    const [memo, setMemo] = useState({});

    const navigate = useNavigate();
    const axiosInstance = createAxiosInstance(navigate);

    useEffect(()=>{
        getMemo(axiosInstance, id)
        .then((res)=>{
            setMemo(res.data);
        })
        .catch(console.error);
    },[]);

    function handleDelete(id){
        if(!confirm("DELETING MEMO")){
            return;
        }
        deleteMemo(axiosInstance, id)
        .then((res)=>{
            if(res.status==204){
                navigate("/memos");
            }
        })
    }

    return(
        <div className="container">
            <h3>{memo.title}</h3>
            <span>{memo.status}</span>
            <span>{new Date(memo.createdAt).toLocaleString()}</span>
            <p>{memo.content}</p>

            <Link to={`/memos/${memo.id}/update`}>UPDATE</Link>
            <button type="button"
            onClick={()=>handleDelete(memo.id)}>X</button>
            
        </div>
    );
}
export default Memo;