import { useReducer } from "react";
import FilterBar from "../components/layout/FilterBar";
import Pagination from "../components/layout/Pagination";
import useMemos from "../hooks/useMemos"
import {useAxios} from "../context/AxiosContext"
import MemoCard from "../components/memo/MemoCard";
import Button from "../components/ui/Button";

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
    
    return(
        <>
            {loading && (<p>로딩중...</p>) }

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-600">LIST</h2>
                <p className="text-md text-gray-600">
                    {total} MEMOS AVAIL 
                </p>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {memos.map(memo=>(
                    <MemoCard key={memo.id} memo={memo} />
                ))}
            </div>

            <Pagination
            totalPage={totalPage}
            page={page}
            setPage={v=>dispatch({type: "SET_PAGE", payload: v})}
            />
        </>
    );
}
export default MemoList;