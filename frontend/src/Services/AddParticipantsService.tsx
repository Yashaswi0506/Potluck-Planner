import {httpClient} from "@/Services/HttpClient.tsx";

export const AddParticipantService = {
  async send(id, participant_id){
    console.log("inside message services");
    return httpClient.post("/participants", {id, participant_id});
  }
};
