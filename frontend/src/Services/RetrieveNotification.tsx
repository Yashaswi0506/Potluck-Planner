import { HttpClientSearch } from "@/Services/HttpClient.tsx";
import axios from "axios";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

export const RetrieveNotificationService = {
  async send(participant__id: string) {
    console.log("Notification uid", participant__id);
    const data = JSON.stringify({
      participant_id: participant__id
    });
    
    const config = {
      method: 'search',
      maxBodyLength: Infinity,
      url: `http://${serverIP}:${serverPort}/notifications/view`,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      data: data
    };
    
    
    
    
    return axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        return response.data;
      });
   
  }
};
