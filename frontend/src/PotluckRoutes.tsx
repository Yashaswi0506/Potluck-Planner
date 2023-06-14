//import { CreateProfile } from "@/Components/CreateProfile.tsx";
import {AfterLogin} from "@/Components/AfterLogin.tsx";
import {CreateEvent} from "@/Components/CreateEvent.tsx";
import {ManagePotluck} from "@/Components/ManagePotluck.tsx";
import { Home } from "@/Components/HomePage.tsx";
import { ProtectedRoute } from "@/Components/ProtectedRoute.tsx";
import {RecommendedPotluck} from "@/Components/RecommendedPotluck.tsx";
import {Signup} from "@/Components/Signup.tsx";
import {Login} from "@/Components/Login.tsx";
import { UserAuthContextProvider, useUserAuth } from "@/Context/AuthContext.tsx";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {Notifications} from "@/Components/Notifications.tsx";
import {Logout} from "@/Components/Logout.tsx";
import {auth} from "./firebaseSetup.ts";
import"@css/PotluckStyles.css";


export function PotluckRouter() {
    // console.log(auth.currentUser);
    //const currentuser1 = auth.currentUser;
    const auth = useUserAuth();
    console.log(auth);
    return (
      <div className={"potluckfancy"}>
          <nav className="bg-blue-800 rounded-b shadow-lg mb-4">
              <div className="navbar justify-center">
                  <div className="navbar-center lg:flex">
                      
                      <ul className={"menu menu-horizontal"}>
                          <li className = "nav-link  normal-case text-xl block hover:text-blue-300 hover:no-underline focus:text-blue-300 focus:no-underline"><Link to="/">Home</Link></li>
                          {auth?.user!= null ? (
                            <li className = "nav-link normal-case text-xl  block hover:text-blue-300 hover:no-underline focus:text-blue-300 focus:no-underline"><Link to="/logout">Logout</Link></li>
                          ) : (
                            <>
                                <li className = "nav-link normal-case text-xl block hover:text-blue-300 hover:no-underline focus:text-blue-300 focus:no-underline"><Link to="/login"> Login</Link></li>
                                <li className = "nav-link normal-case text-xl  block hover:text-blue-300 hover:no-underline focus:text-blue-300 focus:no-underline"><Link to="/signup"> Create Account</Link> </li>
                            </>
                          )}
                          
                          <li className = "nav-link normal-case text-xl block hover:text-blue-300 hover:no-underline focus:text-blue-300 focus:no-underline"><Link to="/notifications">Notifications</Link></li>
                          <li className ="nav-link normal-case text-xl block hover:text-blue-300 hover:no-underline focus:text-blue-300 focus:no-underline"><Link to="/after_login">My Potlucks</Link></li>
                      
                      
                      </ul>
                  
                  
                  </div>
              </div>
          </nav>
          <UserAuthContextProvider>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                  <Route path="/after_login" element={<AfterLogin />} />
                  <Route path="/recommended" element={<RecommendedPotluck />} />
                  <Route path="/manage_potluck" element={<ManagePotluck />} />
                  <Route path="/events" element={<CreateEvent />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/logout" element={<Logout />} />
              
              </Routes>
          </UserAuthContextProvider>
      </div>
    );
}
