
//the is a page which will get displayed after user logs in
//the page will have "Create Potluck" button, along with applicaiton info
//"My potlucks" heading with two buttons "Potluck I can manage" and "Potluck that I am attending"


import { useUserAuth } from "@/Context/AuthContext.tsx";
import {AuthenticatedUser, ProfileType} from "@/PotluckTypes.ts";
import {Route, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Login} from "@/Components/Login.tsx";
import {Col, Row} from "react-bootstrap";

export const AfterLogin = () => {
  
  const [events, setEvents] = useState([]);
  const auth = useUserAuth();
  const[email, setEmail] = useState("");
  
  const getUsers = async (email) => {
    const eventsRes = await axios({
      method: 'search',
      url: "http://localhost:8080/events/attended",
      headers: {"Access-Control-Allow-Origin": "*"},
      data: {
        email: email
      }
    });
    return eventsRes.data;
  };
  
  useEffect(() => {
    if (auth.user && auth.user.uid) {
      setEmail(auth.user.email);
      getUsers(auth.user.email).then(setEvents);
      
    }
    
  }, []);
  
  
  const navigate = useNavigate();
  
  const onCreateOrEditEventButtonClick = (id) => {
    navigate("/events", {state: {eventID:id}});
  };
  
  const onPotluckButtonclick = (id) => {
    console.log("event id in after login :", id);
    navigate("/manage_potluck", {state: {eventID:id}});
    
  };
  
  
  
  
  //delete event
  const onDeleteEventButtonclick = (id) => {
    const  delete_event_req= async () => {
      const result = await axios({
        method: 'delete',
        url: "http://localhost:8080/events",
        headers: {"Access-Control-Allow-Origin": "*"},
        data: {
          event_id:id, host_id:email
        }
        
      });
      
      return result.status;
    };
    
    delete_event_req().then(value =>{
      if (value === 200){
        console.log("Event Deleted");
        window.location.reload();
      }
      else{
        console.log("Event not deleted.");
      }
    });
    
  };
  
  
  return (
    <div>
      
      <div>
        <button className="btn btn-primary btn-circle" onClick={onCreateOrEditEventButtonClick.bind(null, null)}>Create Event</button>
      </div>
      <div>
        <h2>My Potlucks:</h2>
        <table border={1}>
          <tbody>
          <tr>
            <th>Event Name</th>
            <th>Event Location</th>
            <th>Event Date</th>
          </tr>
          {events ?
            events.map((event: { id: number, event_name: string; event_location: string, event_date: string, is_host: string}) => (
              <tr key={event.id}>
                <th><button className="btn btn-primary btn-circle" onClick={onPotluckButtonclick.bind(null,event.id)}>{event.event_name}</button></th>
                <th>{event.event_location}</th>
                <th>{event.event_date}</th>
                <th>{event.is_host}</th>
                <th><button className="btn btn-primary btn-circle" onClick={onCreateOrEditEventButtonClick.bind(null,event.id)}>Edit</button></th>
                <th><button className="btn btn-primary btn-circle" onClick={onDeleteEventButtonclick.bind(null,event.id)}>Delete</button></th>
              </tr>
            ))
            : "Not found"}
          </tbody>
        </table>
      </div>
    </div>
  
  );
};

//<a href="/manage_potluck">{event.event_name}</a>
//<button className="btn btn-primary btn-circle" onClick={onPotluckButtonclick}>{event.event_name</button>
