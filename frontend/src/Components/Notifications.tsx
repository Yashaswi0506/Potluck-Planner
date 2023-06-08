import { useUserAuth , UserAuthContextProvider} from "@/Context/AuthContext.tsx";
import { Host, Message, NotificationProps, Participant } from "@/PotluckTypes.ts";
import { RetrieveNames } from "@/Services/RetrieveNames.tsx";
import { UpdateRSVPService } from "@/Services/UpdateRSVP.tsx";
import { VerifyTokenService } from "@/Services/VerifyTokenService.tsx";

import { useEffect, useState } from "react";
import {RetrieveNotificationService} from "@/Services/RetrieveNotification.tsx";
import {auth} from "../firebaseSetup.ts";


  export const Notifications = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [participant, setParticipant] = useState("");
  //const [host, setHost] = useState("");
  const auth = useUserAuth();
    const id = auth.user.uid;
  //const [id, setId] = useState("");
    const [selectedOption, setSelectedOption] = useState('');
    const [hostname, setHost] = useState<Host[]>([]);
    const [eventId, setEventId] = useState("");
 
    
    
    
    
    
    useEffect(() => {
      if (auth.user && auth.user.uid) {
        fetchNotifications(auth.user.uid);
        //fetchEventDates(auth.user.id);
        
        
        
            
        
      }
  },[auth.user]);
    
    const fetchNotifications = async (id) => {
      try {
        console.log("sending req");
        console.log(id);
        await RetrieveNotificationService.send(id)
          .then((response) => {
            (setMessages(response));
            console.log(response);
            const hostIds = response.map((message) => message.host);
            console.log(hostIds);
            
            RetrieveNames.send(hostIds)
              .then((hostnames) => {
                console.log(hostnames);
                setHost(hostnames);
              });
            
            console.log("Message:", messages);
            //console.log("Hostname:", hostnames[messages.hostname]);
            
          });
        
        
          
           
        
        
        
        //setMessages(response);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
      
    };
   const storeRSVP = async (value, eventId) => {
     console.log(value);
     //setSelectedOption(value);
     setEventId(eventId);
     console.log(eventId);
     console.log(selectedOption);
     const response = await UpdateRSVPService.send(eventId, auth.user.uid, value);
     console.log(response);
   };
     
    
     
     
     
    
    
    
    
    
    
    
    return (
      <>
        <div></div>
        <div>Notifications</div>
        <div>
          {hostname.map((host) => (
            
            <div key={host.id}>
              {messages
                .filter((msg) => msg.host === host.id)
                .map((message) => (
                  <div key={message.id}>
                    <p>Potluck Invitation from: {host.hostname}</p>
                    <p>{message.message}</p>
                    <div >
                      <fieldset>
                        <legend>Are you able to attend?</legend>
                        <div className ="radio_class">
                          <input type="radio"
                                 name="rsvp"
                                 id ="yes"
                                 value = "yes"
                                 onChange= {e=> storeRSVP(e.target.value, message.eventId) }/>
                          <label htmlFor = "yes">Yes</label>
                        </div>
                        <div className ="radio_class">
                          <input type="radio" name="rsvp" id ="no" value = "no"    onChange= {e=> storeRSVP(e.target.value, message.eventId) }/>
                          <label htmlFor = "no">No</label>
                        </div>
                        <div className ="radio_class">
                          <input type="radio" name="rsvp" id ="maybe"  value = "maybe"   onChange= {e=> storeRSVP(e.target.value, message.eventId)}/>
                          <label htmlFor = "maybe">Maybe</label>
                        </div>
                      </fieldset>
                    
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </>
    );
  
};





  

