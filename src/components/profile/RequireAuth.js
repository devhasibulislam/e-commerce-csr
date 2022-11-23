import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import Loading from "../../shared/loading/Loading";

const RequireAuth = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  let location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (Object?.keys(user)?.length === 0) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
