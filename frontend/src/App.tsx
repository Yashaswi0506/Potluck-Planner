import { PotluckRouter } from "@/PotluckRoutes.tsx";

import { Link, Route, Routes, Router, BrowserRouter } from "react-router-dom";


// This is our base React Component
export function App() {
  return (
    <BrowserRouter>
      <div className="App doggr">
          <PotluckRouter/>
      </div>
     
    </BrowserRouter>
  );
}

export default App;
