import { useUserAuth , UserAuthContextProvider} from "@/Context/AuthContext.tsx";
import { Host, Message, NotificationProps, Participant } from "@/PotluckTypes.ts";
import { RetrieveNames } from "@/Services/RetrieveNames.tsx";
import { VerifyTokenService } from "@/Services/VerifyTokenService.tsx";

import { useEffect, useState } from "react";
import {RetrieveNotificationService} from "@/Services/RetrieveNotification.tsx";
import {auth} from "../firebaseSetup.ts";


  export const Notifications = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [participant, setParticipant] = useState("");
  //const [host, setHost] = useState("");
  const auth = useUserAuth();
  //const [id, setId] = useState("");
    const [hostname, setHost] = useState<Host[]>([]);
  const id = auth.user.uid;
    
    
    
    
    
    useEffect(() => {
      if (auth.user && auth.user.uid) {
        fetchNotifications(auth.user.uid);
        
        
        
            
        
      }
  },[auth.user]);
    
    const fetchNotifications = async (id) => {
      try {
        console.log("sending req");
        console.log(id);
          await RetrieveNotificationService.send(id)
           .then((response)=> {
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
                  </div>
                ))}
            </div>
          ))}
        </div>
      </>
    );
  
};





  

