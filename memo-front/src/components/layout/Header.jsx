import { Link, useNavigate } from "react-router-dom";
import {useAuth} from '../../hooks/useAuth'
import Button from "../ui/Button";

function Header(){
    const {isLoggedIn, setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        navigate("/login");
    }

    return(
        <header className="bg-indigo-100 border-b border-indigo-200">
            <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">
                    <Link to="/memos">My Memos</Link>
                </h1>
                <nav>
                    <ul className="flex items-center gap-4 text-sm font-medium text-gray-700">
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <Button to={"/memos/create"}>NEW</Button>
                                </li>
                                <li>
                                    <Button to={"/mypage"} variant="outline"> My Page</Button>
                                </li>
                                <li>
                                    <Button onClick={handleLogout} variant="outline">Logout</Button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Button to="/login">Login</Button>
                                </li>
                                <li>
                                    <Button to="/signup">Sign Up</Button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
export default Header;