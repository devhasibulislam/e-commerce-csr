import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../App";

const RequireAuth = ({ children }) => {
  const user = useContext(UserContext);
  let location = useLocation();

  if (user === undefined) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
