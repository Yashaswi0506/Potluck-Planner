import { useUserAuth } from "@/Context/AuthContext.tsx";
import { auth } from "@/firebaseSetup.ts";
import { httpClient } from "@/Services/HttpClient.tsx";
import {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
//import{CreateUserService} from "../Services/CreateUserService.tsx";

export enum SubmissionStatus {
  NotSubmitted,
  SubmitFailed,
  SubmitSucceeded
}


export const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);
  const { signUp, user } = useUserAuth();
  const navigate = useNavigate();
  const [uid, setUID] = useState("");
  const [signInDB, setSignInDB] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await signUp(email, password).then((signInUser) => {
        setSignInDB(true);
        setUID(signInUser.user.uid);
      });
    } catch (err) {
      setError(err.message);
    }
  };
  
  useEffect(() => {
    if (signInDB && uid !== "") {
      const createUser = async () => {
        await httpClient
          .post("/users", { id: uid, name, email })
          .then((response) => {
            console.log("User Creation Status", response.status);
            if (response.status === 200) {
              setSubmitted(SubmissionStatus.SubmitSucceeded);
            } else {
              setSubmitted(SubmissionStatus.SubmitFailed);
            }
          });
      };
      
      createUser().then(() => {
        navigate("/");
      });
      
      setSignInDB(false);
    }
  }, [signInDB, uid, name, email, navigate]);
  
  
  
  
  
  
  
  return(
    <>
      <div className="relative flex flex-col items-center">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl mt-50">
          <h3 className="text-3xl font-semibold text-center text-700">
            Sign Up
          </h3>
        
        <Form onSubmit = {handleSubmit} className = "space-y-4">
          <div className="flex flex-col items-center">
          <Form.Group className="flex items-center mb-3" controlId="formBasicEmail">
            <Form.Label className="mr-2"> Email Id</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={e => setEmail(e.target.value)}
            
            />
          </Form.Group>
            
          
          
          <Form.Group className="flex items-center mb-3" controlId="formBasicName">
            <Form.Label className="mr-2"> Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              onChange={e => setName(e.target.value)}
            
            />
          </Form.Group>
          
          <Form.Group className="flex items-center mb-3" controlId="formBasicPassword">
            <Form.Label className="mr-2"> Password</Form.Label>
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
          </div>
        </Form>
    <hr/>
      <div className="p-4 text-center">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
        </div>
        </div>
    </>
  );
};
