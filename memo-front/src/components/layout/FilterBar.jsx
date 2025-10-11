import { useState } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";

function FilterBar({size, setSize, status, setStatus,
    sort, setSort, onSearch
}){
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSearch(inputValue);
    };

    return(
        <div className="flex flex-wrap gap-3 items-center mb-4">

            <form onSubmit={handleSubmit}
            className="flex flex-1 min-w-[200px] gap-4">
                <Select 
                value={size}
                onChange={(e)=>setSize(e.target.value)}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </Select>

                <Select
                value={status}
                onChange={(e)=>setStatus(e.target.value)}>
                    <option value={""}>ALL</option>
                    <option value={"PINNED"}>PIN</option>
                    <option value={"DONE"}>DONE</option>
                </Select>

                <Select
                value={sort}
                onChange={(e)=>setSort(e.target.value)}>
                    <option value={"createdAt,desc"}>LATEST</option>
                    <option value={"createdAt,asc"}>OLDEST</option>
                    <option value={"title,asc"}>TITLE</option>
                </Select>

                <Input
                type="text"
                placeholder="SEARCH..."
                onChange={(e) => setInputValue(e.target.value)}
                />
            </form>
        </div>
    );
}
export default FilterBar;