import {useUserAuth} from "@/Context/AuthContext.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = ()  =>{
  const {logOut} = useUserAuth();
  const { user } = useUserAuth();
  console.log(user);
  const navigate = useNavigate();
  useEffect( () => {
    async function processLogout() {
      
        await logOut();
        console.log("user should be empty");
        console.log(user);
       // navigate("/");
      
    }
    
    processLogout().then( () => {
      console.log("Logout completed successfully");
      console.log(user);
    });
  });
  return (
    <></>
  );
};
