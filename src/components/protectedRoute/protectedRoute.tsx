import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useStore} from "../../context/StoreContext";

interface ProtectedRouteProps {
    rule?: any,
    redirectPath?: string,
    children: JSX.Element,
    allowed: number[] | undefined
}

const ProtectedRoute = ({allowed, redirectPath = '/', children}: ProtectedRouteProps) => {
    const {auth} = useStore()

    const isAllowed = allowed?.includes(auth.user.role)

    if (!isAllowed) {
        return <Navigate to={redirectPath} replace/>;
    }
    return children ? children : <Outlet/>;
};

export default ProtectedRoute;
