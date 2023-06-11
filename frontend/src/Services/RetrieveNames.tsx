import { httpClient } from "@/Services/HttpClient.tsx";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

export const RetrieveNames = {
  async send(id, token, uid) {
    const requestData = {
      id: id
    };
    const config = {
      method : 'search',
      url: serverUrl + "/users",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*'
      },
      data: requestData
    };
    return httpClient.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        return response.data;
      });
  }
};
