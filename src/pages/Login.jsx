import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";
// import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.get("http://localhost:5000/accounts");
      const users = res.data;

      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        setError("❌ Invalid Email or Password");
        return;
      }

      localStorage.setItem("user", JSON.stringify(foundUser));

      alert("✅ Login Successful!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("⚠️ Server Error! Try again.");
    }
  };

  return (
    <div className="auth-bg">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="auth-card p-4 shadow-lg">
          <h2 className="text-center mb-3 text-dark fw-bold">Login</h2>

          {error && <p className="text-danger text-center">{error}</p>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 fw-bold" variant="primary">
              Login
            </Button>
          </Form>

          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="fw-bold text-dark">
              Register
            </Link>
          </p>
        </Card>
      </Container>
    </div>
  );
}
