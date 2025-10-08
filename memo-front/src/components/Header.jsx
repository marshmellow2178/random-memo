import { Link, useNavigate } from "react-router-dom";
import {useAuth} from '../hooks/useAuth'

function Header(){
    const {isLoggedIn, setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        navigate("/login");
    }

    return(
        <header>
            <div className="container">
                <Link to = "/">Home</Link>
                <nav>
                    <li>
                        <Link to="/memos">memos</Link>
                    </li>
                    <li>
                        {isLoggedIn ? <button type="button"
                        onClick={handleLogout}>logout</button> : 
                        <Link to="/login">login</Link>  }
                    </li>
                    <li>{isLoggedIn ? 
                        <Link to="/mypage">mypage</Link> :
                        <Link to="/signup">signup</Link>
                        }
                    </li>
                </nav>
            </div>
        </header>
    );
}
export default Header;