import { useState } from "react";

function FilterBar({size, setSize, status, setStatus,
    sort, setSort, onSearch
}){
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSearch(inputValue);
    };

    return(
        <>
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
                value={inputValue}
                onChange={(e)=>setInputValue(e.target.value)}
                placeholder="search"/>
            </form>
        </>
    );
}
export default FilterBar;