
//the is a page which will get displayed after user logs in
//the page will have "Create Potluck" button, along with applicaiton info
//"My potlucks" heading with two buttons "Potluck I can manage" and "Potluck that I am attending"

import { useUserAuth } from "@/Context/AuthContext.tsx";
import { useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {getAuth} from "firebase/auth";

export const AfterLogin = () => {
  const [events, setEvents] = useState([]);
  const auth = useUserAuth();

  
  useEffect(() => {
    const getEvents = async () => {
      const eventsRes = await axios({
        method: 'search',
        url: "http://localhost:8080/events/attended",
        headers: {"Access-Control-Allow-Origin": "*"},
        data: {
          email: auth.user.email
        }
      });
      return eventsRes.data;
    };
    getEvents().then(setEvents);
    
  }, [auth]);
  
  const navigate = useNavigate();
  
  const onCreateOrEditEventButtonClick = (id) => {
    navigate("/events", {state: {eventID:id}});
  };
  
  const onRecommendedPotluckIdeasButtonClick = () => {
    navigate("/recommended");
  };
  
  const onPotluckButtonclick = (id) => {
    console.log("event id in after login :", id);
    navigate("/manage_potluck", {state: {eventID:id}});
  };
  
  //delete event
  const onDeleteEventButtonClick = (id) => {
    const  delete_event_req= async () => {
      console.log(auth);
      const result = await axios({
        method: 'delete',
        url: "http://localhost:8080/events",
        headers: {"Access-Control-Allow-Origin": "*"},
        data: {
          event_id:id,
          host_id: auth.user.uid
        }
      });
      return result.status;
    };

    delete_event_req().then(value =>{
      if (value === 200){
        console.log("Event Deleted");
        alert('You have successfully deleted an event!')

        window.location.reload();
      }
      else{
        console.log("Event not deleted.");
        alert('Only host can delete an event!')
      }
    });
    
  };
  
  
  return (
    <div >
      <div className="flex justify-center">
        <button
          className="btn  btn-sm btn-xs btn-accent mx-1"
          onClick={onCreateOrEditEventButtonClick.bind(null, null)}
        >
          Create Event
        </button>
        <button
          className="btn  btn-sm btn-xs btn-accent mx-1"
          onClick={onRecommendedPotluckIdeasButtonClick}
        >
          Recommended Potluck Ideas
        </button>
      </div>
      <div>
        <div className="flex flex-col  items-center justify-center">
          <table className="table">
          <h2>My Potlucks:</h2>
            <tbody>
              <tr>
                <th style={{ textDecoration: 'underline', textAlign: 'center' }}>Event Name</th>
                <th style={{ textDecoration: 'underline', textAlign: 'center' }}>Event Location</th>
                <th style={{ textDecoration: 'underline', textAlign: 'center' }}>Event Date</th>
              </tr>
              {events
                ? events.map(
                    (event: {
                      id: number;
                      event_name: string;
                      event_location: string;
                      event_date: string;
                      is_host: string;
                    }) => (
                      <tr key={event.id}>
                        <th>
                          <button
                            className="btn btn-ghost text-blue-500 underline text-base"
                            onClick={onPotluckButtonclick.bind(null, event.id)}
                          >
                            {event.event_name}
                          </button>
                        </th>
                        <th>{event.event_location}</th>
                        <th>{event.event_date}</th>
                        <th>{event.is_host}</th>
                        <th>
                          <button
                            className="btn btn-ghost text-blue-500 underline text-base"
                            onClick={onCreateOrEditEventButtonClick.bind(
                              null,
                              event.id
                            )}
                          >
                            Edit
                          </button>
                        </th>
                        <th>

                          <button
                            className="btn btn-ghost text-blue-500 underline text-base"
                            onClick={onDeleteEventButtonClick.bind(
                              null,
                              event.id
                            )}
                          >
                            Delete
                          </button>
                        </th>
                      </tr>
                    )
                  )
                : "Not found"}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


