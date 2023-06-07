import {httpClient} from "@/Services/HttpClient.tsx";

export const UpdateRSVPService = {
  async send(id, participant_id, rsvp){
    console.log("inside message services");
    console.log(rsvp);
    return httpClient.put("/participants/rsvp", {id, participant_id, rsvp});
  }
};
