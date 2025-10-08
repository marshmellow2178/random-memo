import { Link } from "react-router-dom";

function Home(){
    return(
        <div className="container">
            <b>
                홈 페이지입니다
            </b>
            <div>
                <div>
                    <Link to="/mypage">회원정보</Link>
                </div>
                <div>
                    <Link to="/memos">메모장</Link>
                </div>
                <div>
                    <Link to="/memos/create">새 메모 +</Link>
                </div>
            </div>
        </div>
    );
}
export default Home;
