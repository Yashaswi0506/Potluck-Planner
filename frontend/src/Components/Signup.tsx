import { useUserAuth } from "@/Context/AuthContext.tsx";
import { auth } from "@/firebaseSetup.ts";
import { httpClient } from "@/Services/HttpClient.tsx";
import { useState } from "react";
import {Button, Form} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
//import{CreateUserService} from "../Services/CreateUserService.tsx";

export enum SubmissionStatus {
  NotSubmitted,
  SubmitFailed,
  SubmitSucceeded
}
export const Signup = () =>
{
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]= useState("");
  const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);
  const {signUp  } = useUserAuth();
  const {logOut} = useUserAuth();
  const navigate =useNavigate();
  const [uid , setUID] = useState("");
  const {user} = useUserAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const signIn = await signUp(email,password);
      navigate("/", {state:{name}});
      //console.log(user.uid);
      const id = user.uid;
      
      
      
          const signInDB = httpClient.post("/users", {id,name, email})
        .then( (response) => {
          console.log("User Creation Status", response.status);
          if (response.status === 200) {
            setSubmitted(SubmissionStatus.SubmitSucceeded);
          } else {
            setSubmitted(SubmissionStatus.SubmitFailed);
          }
        });
      
     
    } catch(err) {
      setError(err.message);
    }
    
  };
  
  return(
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Signup</h2>
        
        <Form onSubmit = {handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={e => setEmail(e.target.value)}
            
            />
          </Form.Group>
         
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Enter Name"
              onChange={e => setName(e.target.value)}
            
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            
            />
          </Form.Group>
          
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};
