import { RSVPList, user } from "@/PotluckTypes.ts";
import { DisplayRSVPStatus } from "@/Services/DisplayRSVPStatus.tsx";
import React, { useEffect, useState } from "react";

export const Modal = ({ event_id , closeModal}) => {
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
  },[]);
  return (
    <>
      <div className="modalBackground"></div>
      <div className="modalContainer">
        <button onClick={()=>{closeModal(false);}} >X
          </button>
        <div className="title"></div>
        <h2>{event_id}</h2>
        <div className="body">
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>RSVP</td>
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
