//import { CreateProfile } from "@/Components/CreateProfile.tsx";
import { Home } from "@/Components/HomePage.tsx";
import { ProtectedRoute } from "@/Components/ProtectedRoute.tsx";
import {Signup} from "@/Components/Signup.tsx";
import {Login} from "@/Components/Login.tsx";
import { UserAuthContextProvider } from "@/Context/AuthContext.tsx";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {Notifications} from "@/Components/Notifications.tsx";
import {Logout} from "@/Components/Logout.tsx";

export function PotluckRouter() {
  return (
    <div className={"potluckfancy"}>
      <nav className="bg-blue-800 rounded-b shadow-lg mb-4">
        <div className="navbar justify-center">
          <div className={"navbar-center lg:flex"}>
            
            <ul className={"menu menu-horizontal"}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Login">Login</Link></li>
              <li><Link to="/Singup">Signup</Link></li>
              <li><Link to="/notifications">Notifications</Link></li>
              <li><Link to="/Logout">Logout</Link></li>
            </ul>
          
          
          </div>
        </div>
      </nav>
      <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Singup" element={<Signup />} />
        <Route path="/Logout" element={<Logout />} />
        
      </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

