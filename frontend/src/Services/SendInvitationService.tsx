import {httpClient} from "@/Services/HttpClient.tsx";

export const SendInvitationService = {
  async send(event_id, user_id, guestArray, message){
    console.log("inside message services");
    return httpClient.post("/notifications", {event_id: event_id, host_id:user_id, participant_id : guestArray, message:message});
  }
};
