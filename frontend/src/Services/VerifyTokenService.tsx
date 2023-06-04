import axios from "axios";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;


export const VerifyTokenService   =async(token: string, uid: string) => {
  
  console.log(token);
  console.log(uid);
  console.log("inside VerifyToken");
  const data = JSON.stringify({
    uid: uid
  });
  
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://${serverIP}:${serverPort}/login`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    data : data
  };
  
 return  axios.request(config);
  //  .then((response) => {
      //console.log(JSON.stringify(response.data));
    //});
  //console.log(res);
  //console.log("odfsp[f");
 // return res;
};







