import { PotluckRouter } from "@/PotluckRoutes.tsx";

import { Link, Route, Routes, Router, BrowserRouter } from "react-router-dom";
import {UserAuthContextProvider}  from "@/Context/AuthContext.tsx";

// This is our base React Componentr
export function App() {
    return (
        <BrowserRouter>
            <UserAuthContextProvider>
                <div className="App doggr">
                    <PotluckRouter/>
                </div>
            </UserAuthContextProvider>
        </BrowserRouter>
    );
}

export default App;
