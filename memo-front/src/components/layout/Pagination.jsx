function Pagination({totalPage, page, setPage}){

    if(totalPage <=1) return null;

    const handlePrev = () =>{
        if(page>0) setPage(page-1);
    }
    const handleNext = () =>{
        if(page < totalPage -1) setPage(page+1);
    }

    const pages = Array.from({length:totalPage}, (_, i)=>i);

    return(
        <div className="flex justify-center items-center gap-2 mt-6">
            <button
            onClick={handlePrev}
            disabled={page==0}
            className={`px-3 py-1 rounded-md text-sm font-medium border 
                ${page === 0 ? "text-gray-400 border-gray-200 cursor-default" : "hover:bg-indigo-50 border-gray-300 text-gray-700"}`}
            >←</button>

            {pages.map((num)=>(
                <button
                key={num}
                onClick={()=>setPage(num)}
                className={`w-8 h-8 flex items-center justify-center rounded-md border text-sm font-medium transition
                     ${num === page 
                    ? "bg-indigo-500 text-white border-indigo-500" 
                    : "border-gray-300 text-gray-700 hover:bg-indigo-50"}`}
                >{num+1}</button>
            ))}

            <button
            onClick={handleNext}
            disabled={page===totalPage-1}
            className={`px-3 py-1 rounded-md text-sm font-medium border 
                ${page === totalPage - 1 ? "text-gray-400 border-gray-200 cursor-default" : "hover:bg-indigo-50 border-gray-300 text-gray-700"}`}
            >→</button>
        </div>
    );
}

export default Pagination;