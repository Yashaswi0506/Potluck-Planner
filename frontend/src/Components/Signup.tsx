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
