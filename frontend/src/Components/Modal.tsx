import React from "react";

export const Modal= ()=>{
  return(
    <>
    <div className = "modalBackground"></div>
      <div className = "modalContainer">
        <div className = "title"></div>
          <h2>Guest List</h2>
        <div className= "body">
          <table>
            <tr>
              <th>Name</th>
              <th>RSVP</th>
            </tr>
          </table>
        </div>
        
      </div>
      </>
  );
};
