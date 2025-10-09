import {getMemos} from "../api/memo";
import { useState, useEffect } from "react";
export default function useMemos(axiosInstance, filter){
    const [loading, setLoading] = useState(true);
    const [memos, setMemos] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        console.log("필터상태:", filter);
        getMemos(axiosInstance, filter)
        .then((res)=>{
            setMemos(res.data.content);
            setLoading(false);
            setTotalPage(res.data.totalPages);
            setTotal(res.data.totalElements);
        })
        .catch(console.error);
    },[filter]);

    return {loading, memos, totalPage, total};
}