import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuthContextProvider, useUserAuth } from "../Context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  
  try {
    
    console.log("Checking Protected Route: ", user);
    if (!user) {
      console.log(user);
      return <Navigate to="/" />;
    }
    return children;
  }
  catch(error){
    console.log("User is not authenticated or authoorized");
  }
};
