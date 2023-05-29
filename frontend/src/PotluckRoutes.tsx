//import { CreateProfile } from "@/Components/CreateProfile.tsx";
import { Home } from "@/Components/HomePage.tsx";


import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {Notifications} from "@/Components/Notifications.tsx";

export function PotluckRouter() {
  return (
    <div className={"potluckfancy"}>
      <nav className="bg-blue-800 rounded-b shadow-lg mb-4">
        <div className="navbar justify-center">
          <div className={"navbar-center lg:flex"}>
            
            <ul className={"menu menu-horizontal"}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/notifications"> Notifications</Link></li>
              
            </ul>
          
          
          </div>
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />
        
      </Routes>
    </div>
  );
}

