import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {getMemo, deleteMemo} from "../api/memo"
import { useAxios } from "../context/AxiosContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

function Memo(){
    const {id} = useParams();
    const [memo, setMemo] = useState({});

    const navigate = useNavigate();
    const axios = useAxios();

    useEffect(()=>{
        getMemo(axios, id)
        .then((res)=>{
            setMemo(res.data);
        })
        .catch(console.error);
    },[]);

    function handleDelete(id){
        if(!confirm("DELETING MEMO")){
            return;
        }
        deleteMemo(axios, id)
        .then((res)=>{
            if(res.status==204){
                navigate("/memos");
            }
        })
    }

    return(
        <Card className="p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{memo.title}</h2>
                <p className="text-gray-700 whitespace-pre-line">{memo.content}</p>
                <p className="mt-3 text-gray-400 text-sm italic">No comments yet.</p>
            </div>
            
            <footer className="flex justify-between items-center text-sm text-gray-400 border-t pt-3 border-gray-200">
                <span>{memo.status}</span>
                <span>{new Date(memo.createdAt).toLocaleString()}</span>
            </footer>

            <div className="flex justify-center gap-3 pt-4 border-t border-gray-200">
                <Button to={`/memos`} variant="outline">LIST</Button>
                <Button to={`/memos/${memo.id}/update`}>UPDATE</Button>
                <Button onClick={()=>handleDelete(memo.id)}
                variant="danger">DELETE</Button>
            </div>
        </Card>
    );
}
export default Memo;