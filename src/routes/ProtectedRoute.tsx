import { ReactNode } from "react";
import { logOut, useCurrentToken } from "../redux/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { verifiyToken } from "../utils/VerifyToken";
import { Navigate, useLocation } from "react-router-dom";


type TProtectedRoute = {
    children: ReactNode;
};
const ProtectedRoute = ({ children }: TProtectedRoute) => {
    const location = useLocation();
    const token = useAppSelector(useCurrentToken)
    let user;
    if (token) {
        user = verifiyToken(token)
    }
    const dispatch = useAppDispatch()
    // if (role !== undefined && role !== user?.role) {
    //     dispatch(logOut())
    //     return <Navigate to="/login" replace={true} state={{ from: location }} />
    // }
    if (!token && !user) {
        dispatch(logOut())
        return <Navigate to="/login" replace={true} state={{ from: location }} />
    }
    return children;

}
export default ProtectedRoute