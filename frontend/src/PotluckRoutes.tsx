//import { CreateProfile } from "@/Components/CreateProfile.tsx";
import { Home } from "@/Components/HomePage.tsx";
import { ProtectedRoute } from "@/Components/ProtectedRoute.tsx";
import {Signup} from "@/Components/Signup.tsx";
import {Login} from "@/Components/Login.tsx";
import { UserAuthContextProvider, useUserAuth } from "@/Context/AuthContext.tsx";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {Notifications} from "@/Components/Notifications.tsx";
import {Logout} from "@/Components/Logout.tsx";
import {auth} from "./firebaseSetup.ts";
export function PotluckRouter() {
 // console.log(auth.currentUser);
  //const currentuser1 = auth.currentUser;
  const auth = useUserAuth();
  console.log(auth);
  return (
    <div className={"potluckfancy"}>
      <nav className="bg-blue-800 rounded-b shadow-lg mb-4">
        <div className="navbar justify-center">
          <div className={"navbar-center lg:flex"}>
            
            <ul className={"menu menu-horizontal"}>
              <li><Link to="/">Home</Link></li>
              {auth?.user!= null ? (
                <li><Link to="/logout">Logout</Link></li>
              ) : (
                <>
                  <li><Link to="/login"> Login</Link></li>
                  <li><Link to="/signup"> Create Account</Link> </li>
                </>
              )}
              
              <li><Link to="/notifications">Notifications</Link></li>
            
            </ul>
          
          
          </div>
        </div>
      </nav>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications/></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
        
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}
