import axios from "axios";
import jwt from "jsonwebtoken";
export const getPublicKey = async (token:string) =>{
  const publicKeyReq = await axios.get("https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com");
  if(publicKeyReq.status===200){
    return publicKeyReq.data;
  }
  return {};
};

export const verifyToken = async (token, uid) => {
  const publicKey  = await getPublicKey(token);
  console.log(publicKey);
  console.log(token);
  
  
  try {
    const header64 = token.split(".")[0];
    const header = JSON.parse(
      Buffer.from(header64, "base64").toString("ascii"));
    
      console.log(uid);
      return jwt.verify(token, publicKey[header.kid], {
      algorithms: ["RS256"],
      audience: "potluck-planner-719aa",
      issuer: "https://securetoken.google.com/potluck-planner-719aa",
      subject: uid,
      
    });
  } catch (error) {
    console.log("Errpr");
    throw new Error(error);
  }
};



