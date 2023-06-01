import { useUserAuth } from "@/Context/AuthContext.tsx";
import { useState } from "react";
import {Button, Form} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


export const Signup = () =>
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]= useState("");
  const {signUp } = useUserAuth();
  const navigate =useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await signUp(email,password);
      navigate("/");
    }catch(err) {
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
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </>
  );
};
