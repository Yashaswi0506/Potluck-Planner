import axios from "axios";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

// This is why I use Axios over Fetch
export const httpClient = axios.create({
  baseURL: serverUrl,
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*'
  },
});

export const setUserAuth = (token) => {
  httpClient.defaults.headers.common['Authorization'] = 'Bearer' +token ;
};

export const HttpClientSearch = (url, data) => {
  return httpClient.request({
    method: 'search',
    baseURL: url,
    data: data,
    maxBodyLength: Infinity
  });
  
};
