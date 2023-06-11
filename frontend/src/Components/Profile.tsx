import { ProfileType } from "@/PotluckTypes.ts";
import { useEffect } from "react";

export type ProfileProps = ProfileType & {
<<<<<<< HEAD
    onCreateEventButtonClick: () => void;
  };

export function Profile(props: ProfileProps) {
    const { name, onCreateEventButtonClick } = props;


    return (
        <div className={"flex flex-col items-center rounded-box bg-slate-700 w-4/5 mx-auto"}>
            <h2 className={"text-4xl text-blue-600"}>{name}</h2>
            <div className={"space-x-8 my-1"}>
                <button className="btn btn-circle" onClick={onCreateEventButtonClick}>Create Event</button>

            </div>
        </div>
    );
=======
  onCreateEventButtonClick: () => void;
};

export function Profile(props: ProfileProps) {
  const { name, onCreateEventButtonClick } = props;
  
  
  return (
    <div className={"flex flex-col items-center rounded-box bg-slate-700 w-4/5 mx-auto"}>
      <h2 className={"text-4xl text-blue-600"}>{name}</h2>
      <div className={"space-x-8 my-1"}>
        <button className="btn btn-circle" onClick={onCreateEventButtonClick}>Create Event</button>
      
      </div>
    </div>
  );
>>>>>>> contri/yashaswi
}
