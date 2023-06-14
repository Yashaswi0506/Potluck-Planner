import { useUserAuth } from "@/Context/AuthContext.tsx";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
export const Login = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();

  const { user } = useUserAuth();
  const navigate = useNavigate();
  const [authorization, setauthorization] = useState("");
  const [idToken, setIdToken] = useState<any>({});
  const { logOut } = useUserAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
      console.log(email);

      //console.log(user);
    } catch (err) {
      //  setError(err.message);

      console.log(err);
    }
  };
  return (
    <>
      <div className="relative flex flex-col items-center">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl mt-50">
          <h3 className="text-3xl font-semibold text-center text-700">
            Login
          </h3>

          <Form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="mb=1 mr-2"> Username</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="mb=1 mr-2">Password</Form.Label>
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
            </div>
          </Form>
          <hr />
        
        <div className="p-4 text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
      </div>
    </>
  );
};
