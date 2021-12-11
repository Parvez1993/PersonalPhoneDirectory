import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config";
import { setuser } from "../redux/actions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.length > 0 || !password.length > 0) {
      setErr("Please fill all the forms");
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setuser("");
        setPassword("");
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErr(errorMessage);
      });
  };
  return (
    <div>
      <div className="container text-4xl text-center my-5">Login</div>
      {err ? <Alert>{err}</Alert> : ""}
      <Container>
        <div class="mt-24 shadow-lg p-8">
          <Form>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
        <Link to="/signup">Dont have accout click here</Link>
      </Container>
    </div>
  );
}

export default Login;
