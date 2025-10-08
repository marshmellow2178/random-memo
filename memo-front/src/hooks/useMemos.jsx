import {getMemos} from "../api/memo";
import { useState, useEffect } from "react";
export default function useMemos(axiosInstance, filter){
    const [loading, setLoading] = useState(true);
    const [memos, setMemos] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        getMemos(axiosInstance, 
            filter.page, 
            filter.size, 
            filter.keyword, 
            filter.status, 
            filter.sort)
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