import {Navigate} from "react-router";
import {useAuth} from "../../shared/AuthContext";


const Logout = () => {
    const {setAuth} = useAuth();

    localStorage.removeItem('jwt_token');
    localStorage.removeItem('auth');
    setAuth(false);

    return (
        <Navigate to="/auth" replace />
    )
};

export default Logout;

