import { httpClient } from "@/Services/HttpClient.tsx";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

export const DisplayRSVPStatus = {
  async send(id) {
    const requestData = {
      event_id: id
    };
    const config = {
      method : 'search',
      url: serverUrl + "/participants",
      data: requestData
    };
    return httpClient.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        return response.data;
      });
  }
};
