import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMemos } from "../api/memo";
import { useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../api/axiosInstance";

function MemoList(){
    const [loading, setLoading] = useState(true);
    const [memos, setMemos] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [keywordInput, setKeywordInput] = useState("");
    const [size, setSize] = useState(10);
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("createdAt,desc");

    const navigate = useNavigate();
    const axiosInstance = createAxiosInstance(navigate);

    useEffect(()=>{
        getMemos(axiosInstance, {
            page:page, 
            size:size, 
            keyword:keyword, 
            status:status, 
            sort:sort})
        .then((res)=>{
            setMemos(res.data.content);
            setLoading(false);
            setTotalPage(res.data.totalPages);
            setTotal(res.data.totalElements);
        })
        .catch(console.error);
    },[page, size, keyword, status, sort]);

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

    function handleSubmit(event){
        event.preventDefault();
        setKeyword(keywordInput);
    }

    return(
        <div className="container">
            {loading && (<p>로딩중...</p>) }

            <Link to="/memos/create">NEW</Link>

            <div>
                {total} MEMOS AVAIL 
            </div>

            <select 
            value={size}
            onChange={(e)=>setSize(e.target.value)}>
                <option value={5}>5개씩 보기</option>
                <option value={10}>10개씩 보기</option>
                <option value={15}>15개씩 보기</option>
            </select>

            <select
            value={status}
            onChange={(e)=>setStatus(e.target.value)}>
                <option value={""}>전체</option>
                <option value={"PINNED"}>중요</option>
                <option value={"DONE"}>완료</option>
            </select>

            <select
            value={sort}
            onChange={(e)=>setSort(e.target.value)}>
                <option value={"createdAt,desc"}>최신순</option>
                <option value={"createdAt,asc"}>오래된순</option>
                <option value={"title,asc"}>제목순</option>
            </select>

            <form onSubmit={handleSubmit}>
                <input type="search" 
                value={keywordInput}
                onChange={(e)=>setKeywordInput(e.target.value)}
                placeholder="search"/>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>TITLE</th>
                        <th>STATE</th>
                        <th>DATE</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {memos.map((memo)=>(
                        <tr key={memo.id}>
                            <td>
                                <Link to={`/memos/${memo.id}`}>{memo.title}</Link>
                            </td>
                            <td>{memo.status}</td>
                            <td>{new Date(memo.createdAt).toLocaleString()}</td>
                            <td>
                                <button type="button"
                                onClick={()=>handleDelete(memo.id)}>X</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ul>
                {Array.from({length: totalPage}, (_, idx) => (
                    <li key = {idx}>
                        <button onClick={()=>setPage(idx)}>{idx+1}</button>
                    </li>
                ))}
            </ul>

        </div>
    );
}
export default MemoList;