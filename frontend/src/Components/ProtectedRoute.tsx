import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuthContextProvider, useUserAuth } from "../Context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  const auth = useUserAuth();
  try {
    
   
    
    console.log("Check user in Private: ", user);
    if (auth.user.authorization != 'authorized' && !user) {
      console.log(auth.user.authorization);
      return <Navigate to="/" />;
    }
    return children;
  }
  catch(error){
    console.log("User is not authenticated or authoorized");
  }
};

