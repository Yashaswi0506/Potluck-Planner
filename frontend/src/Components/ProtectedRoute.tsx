import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuthContextProvider, useUserAuth } from "../Context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  const {authorization} = useUserAuth();
  
  console.log("Check user in Private: ", user);
  if (!user && authorization!='authorized') {
    console.log(authorization);
    return <Navigate to="/" />;
  }
  return children;
};

