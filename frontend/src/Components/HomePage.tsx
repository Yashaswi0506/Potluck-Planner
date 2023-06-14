import { useLocation } from "react-router-dom";
import potluck from "@images/Potluck.webp";

export const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <Title />
        <Subtitle />
      </div>
      <img src={potluck} alt="food profile image" className="w-400 mt-4" height="400" />
    </div>
  );
};

export function Title() {
  return <h1 className="text-2xl font-bold">Potluck Planner</h1>;
}

export function Subtitle() {
  return <h3 className="text-lg">Where food brings everyone together</h3>;
}
