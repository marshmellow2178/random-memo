import { Link } from "react-router-dom";

function MemoTable({memos, onDelete}){
    return(
        <>
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
                                onClick={()=>onDelete(memo.id)}>X</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
export default MemoTable;