import React from 'react'
import {Navigate, Outlet} from "react-router-dom";

export const ProtectRoute = ({children}) => {

    const isAuth = localStorage.getItem('isAuth');

    if (!isAuth) {
        return <Navigate to="/login" replace />;
      }
    
      return children ? children : <Outlet />;
}
