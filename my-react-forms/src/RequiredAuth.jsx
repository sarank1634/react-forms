import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
// import jwt_decode from "jwt-decode";



const RequiredAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const decoded = auth?.accessToken ? jwt_decode(auth?.accessToken)
    :undefined 

    const rolrs = decoded?.userIfo.roles || []
 
    return (
        auth?.roles?.some(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    );
}

export default RequiredAuth;