import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { getDatabase, ref, set } from "firebase/database";

import { auth } from "../config";
import { useNavigate } from "react-router-dom";
function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !email.length > 0 ||
      !password.length > 0 ||
      !phone.length > 0 ||
      !name.length > 0
    ) {
      setErr("Please fill all the forms");
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        getPhone(user);
      })
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      })
      .then(() => {
        setEmail("");
        setPassword("");
        setPhone("");
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErr(errorMessage);
      });
  };

  const getPhone = (user) => {
    const db = getDatabase();
    set(ref(db, "users/" + user.user.uid), {
      phoneNumber: phone,
      username: name,
    });
  };

  useEffect(() => {
    if (err.length > 0) {
      setTimeout(() => {
        setErr("");
      }, 2000);
    }
  }, [err]);
  return (
    <>
      <div className="container text-4xl text-center my-5">Registration</div>
      {err ? <Alert>{err}</Alert> : ""}
      <Container>
        <div class="mt-24 shadow-lg p-8">
          <Form>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Email</Form.Label>
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
            <Form.Group className="mb-3" controlId="Phone">
              <Form.Label>PhoneNumber</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="User name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
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
      </Container>
    </>
  );
}

export default Registration;
