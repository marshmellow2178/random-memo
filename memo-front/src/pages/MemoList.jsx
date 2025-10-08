import { useReducer } from "react";
import { Link } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import MemoTable from "../components/MemoTable";
import Pagination from "../components/Pagination";
import useMemos from "../hooks/useMemos"
import {useAxios} from "../context/AxiosContext"

const initialFilter = {
    page: 0,
    size: 10,
    keyword: "",
    status: "",
    sort: "createdAt,desc",
    refreshKey: 0, //페이지 리셋용
}

function filterReducer(state, action){
    switch(action.type){
        case "SET_PAGE":
            return {...state, page: action.payload};
        case "SET_SIZE":
            return {...state, size: action.payload, page:0};
        case "SET_KEYWORD":
            return {...state, keyword: action.payload, page:0};
        case "SET_STATUS":
            return {...state, status: action.payload, page:0};
        case "SET_SORT":
            return {...state, sort: action.payload, page:0};
        case "REFRESH":
            return {...state, refreshKey: state.refreshKey+1}
        default: 
            return state;
    }
}

function MemoList(){
    const axios = useAxios();
    const [filter, dispatch] = useReducer(filterReducer, initialFilter);
    const {page, size, keyword, status, sort} = filter;

    const {loading, memos, totalPage, total} = useMemos(axios, filter)
    
    function onDelete(id){
        if(!confirm("DELETING MEMO")){
            return;
        }
        deleteMemo(axios, id)
        .then((res)=>{
            if(res.status==204){
                dispatch({type:"REFRESH"});
            }
        })
    }

    return(
        <div className="container">
            {loading && (<p>로딩중...</p>) }

            <Link to="/memos/create">NEW</Link>

            <div>
                {total} MEMOS AVAIL 
            </div>

            <FilterBar
                size={size}
                setSize={v=>dispatch({type: "SET_SIZE", payload: v})}
                status={status}
                setStatus={v=>dispatch({type: "SET_STATUS", payload: v})}
                sort={sort}
                setSort={v=>dispatch({type: "SET_SORT", payload: v})}
                onSearch={v=>dispatch({type: "SET_KEYWORD", payload: v})}
            />
            
            <MemoTable memos={memos}
            onDelete={onDelete} />

            <Pagination
            totalPage={totalPage}
            page={page}
            setPage={v=>dispatch({type: "SET_PAGE", payload: v})}
            />
        </div>
    );
}
export default MemoList;