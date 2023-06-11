import {httpClient} from "@/Services/HttpClient.tsx";

export const EventService = {
  async send(event_name, event_location, event_date){
    console.log("inside message services");
    return httpClient.post("/events", {event_name, event_location, event_date});
  }
};
