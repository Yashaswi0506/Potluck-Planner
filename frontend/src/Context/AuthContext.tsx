import { VerifyTokenService } from "@/Services/VerifyTokenService.tsx";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut, getAuth
  
} from "firebase/auth";
import { auth } from "../firebaseSetup.ts";

interface UserAuthContextValue {
  user: any;
  logIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  logOut: () => Promise<void>;
  authorization: string
  
}

const userAuthContext = createContext<UserAuthContextValue | null>(null);

export function UserAuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>({});
  const [idToken, setIdToken] = useState<string | null>(null);
  const [authorization, setauthorization] = useState("");
  
  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      
      console.log("Auth", currentUser);
      setUser(currentUser);
      if (currentUser!=null) {
        currentUser.getIdToken()
          .then((token) => setIdToken(token))
          .catch((error) => {
            console.log("Error getting ID token:", error);
            setIdToken(null);
          });
        //console.log(idToken);
        if (idToken != null) {
          VerifyTokenService(idToken, currentUser.uid)
            .then((response) => setauthorization(response.data))
            .catch((error) => {
              // Handle any errors
              console.error(error);
            });
        console.log(authorization);
        
        if(authorization==='unauthorized'){
          console.log(authorization);
          logOut();
          console.log("Not authorized logged out");
        }
          
        }
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [idToken, authorization]);
  
  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, authorization }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
