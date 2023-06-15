//displays user name and rsvp status in modal format
import { RSVPList, user } from "@/PotluckTypes.ts";
import { DisplayRSVPStatus } from "@/Services/DisplayRSVPStatus.tsx";
import React, { useEffect, useState } from "react";


export const Modal = ({ event_id, closeModal }) => {
  const [list, setList] = useState<RSVPList[]>([]);
  const displayParticipants = async (event_id) => {
    DisplayRSVPStatus.send(event_id).then((response) => {
      setList(response);
      console.log("list", list);
    });
  };
  useEffect(() => {
    if (event_id != null) {
      displayParticipants(event_id);
    }
  }, []);
  return (
    <>
      <div className="modalBackground w-full"></div>
      <div className="modalContainer ">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              closeModal(false);
            }}
            className="btn btn-ghost ml-auto"
          >
            X
          </button>
        </div>
        <div className="title"></div>
        
        <div className="body">
          <table className="table w-full">
            <thead>
            <tr>
              <th className="w-1/2 text-lg">Name</th>
              <th className="w-1/2 text-lg">RSVP</th>
            </tr>
            </thead>
            <tbody>
            {list.map((item) => (
              <tr key={`${item.user.name}-${item.RSVP_response}`}>
                <td>{item.user.name}</td>
                <td>{item.RSVP_response}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    
    
    </>
  );
};
