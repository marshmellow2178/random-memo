import { Link } from "react-router-dom";

export default function MemoCard({memo}){

    return(
        <div className="p-4 border rounded-lg shadow-sm
        bg-white hover:shadow-md transition border border-gray-200">
            <Link to={`/memos/${memo.id}`}>
                <h3 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 mb-1 truncate">
                    {memo.title || "제목 없음"}
                </h3>
            </Link>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2 mb-2">
                {memo.content || "내용 없음"}
            </p>
            <div className="mt-3 flex justify-between text-xs text-gray-400">
                <span>{memo.status || "normal"}</span>
                <span>{new Date(memo.createdAt).toLocaleString()}</span>
            </div>
        </div>
    );
}