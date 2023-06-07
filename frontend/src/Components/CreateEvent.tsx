import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {AuthenticatedUser} from "@/PotluckTypes.ts";


export const CreateEvent = () => {
  
  
  const [event_name, setEventName] = useState("");
  const [event_location, setEventLocation] = useState("");
  const [event_date, setEventDate] = useState("");
  const event_info = useLocation();
  const event_id = event_info.state.eventID;
  
  console.log("user id in frontend :", AuthenticatedUser.id);
  
  
  useEffect(() => {
    if(event_id != null) {
      const getEvent = async () => {
        const eventsRes = await axios({
          method: 'search',
          url: "http://localhost:8080/events/one",
          headers: {"Access-Control-Allow-Origin": "*"},
          data: {
            event_id: event_id
          }
        });
        return eventsRes.data[0];
      };
      
      getEvent().then(value => {
        setEventName(value.event_name);
        setEventLocation(value.event_location);
        setEventDate(value.event_date);
      });
    }
  }, [1]);
  
  
  const onSaveEventButtonclick = () => {
    
    const  create_event_req= async () => {
      const result = await axios({
        method: 'post',
        url: "http://localhost:8080/events",
        headers: {"Access-Control-Allow-Origin": "*"},
        data: {
          event_id:event_id, user_id:AuthenticatedUser.id,event_name, event_location, event_date
        }
        
      });
      
      
      return result.status;
    };
    
    create_event_req().then(value =>{
      if (value === 200){
        console.log("created an event");
      }
      else{
        console.log("event not created");
      }
    });
    
    
    
    navigate("/after_login");
  };
  
  const navigate = useNavigate();
  
  const onCancelEventButtonclick = () => {
    
    setEventName("");
    setEventLocation("");
    setEventDate("");
    console.log("EVENT NOT CREATED");
    navigate("/after_login");
    
  };
  
  return (
    <div className="flex flex-col items-center bg-slate-700 w-4/5 mx-auto p-5 rounded-box">
      <h2 className="text-4xl text-blue-600 mb-5">{event_id? "Edit Event:" : "Create Event:"}</h2>
      
      <div className="flex flex-col w-full mb-5">
        <label htmlFor="name" className="text-blue-300 mb-2">Event Name:</label>
        <input
          placeholder="Name..."
          type="text"
          id="name"
          required
          value={event_name}
          onChange={e => setEventName(e.target.value)}
          name="name"
          className="input input-bordered"
        />
      </div>
      
      
      <div className="flex flex-col w-full mb-5">
        <label htmlFor="loc" className="text-blue-300 mb-2">Event Location:</label>
        <input
          placeholder="location..."
          type="text"
          id="loc"
          required
          value={event_location}
          onChange={e => setEventLocation(e.target.value)}
          name="loc"
          className="input input-bordered"
        />
      </div>
      
      <div className="flex flex-col w-full mb-5">
        <label htmlFor="date" className="text-blue-300 mb-2">Event Date:</label>
        <input
          placeholder="date..."
          type="text"
          id="date"
          required
          value={event_date}
          onChange={e => setEventDate(e.target.value)}
          name="date"
          className="input input-bordered"
        />
      </div>
      
      
      {
        event_name != null && event_location != null && event_date != null &&
        <div>
          <button className="btn btn-primary btn-circle" onClick={onSaveEventButtonclick}>Save</button>
          <button className="btn btn-primary btn-circle" onClick={onCancelEventButtonclick}>Cancel</button>
        </div>
      }
    </div>
  );
  
};
