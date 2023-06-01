import { useUserAuth } from "@/Context/AuthContext.tsx";
import { useState } from "react";
import {Button, Form} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
export const Login = () => {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn } = useUserAuth();
    const {user} = useUserAuth();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try {
        await logIn(email, password);
        navigate("/");
        console.log(email);
        
      } catch (err) {
        setError(err.message);
        console.log("error");
      }
    };
    return (
      <>
        <div className="p-4 box">
          <h2 className="mb-3">Firebase Auth Login</h2>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Log In
              </Button>
            </div>
          </Form>
          <hr />
        
        </div>
        <div className="p-4 box mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </>
    );
  };


