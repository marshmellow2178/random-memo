function Pagination({totalPage, page, setPage}){
    return(
        <ul>
            {Array.from({length: totalPage}, (_, idx) => (
                <li key = {idx}>
                    <button 
                    onClick={()=>setPage(idx)}
                    className={page===idx?"active":""}>
                        {idx+1}
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default Pagination;