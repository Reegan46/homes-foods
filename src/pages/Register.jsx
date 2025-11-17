import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";
// import "./Register.css"; // ✅ Added CSS

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.get("http://localhost:5000/accounts");
      const users = res.data;

      if (users.some((u) => u.email === email)) {
        setError("❌ Email already exists!");
        return;
      }

      await axios.post("http://localhost:5000/accounts", { email, password });

      alert("✅ Registration Successful! Now Login");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Server Error! Try again.");
    }
  };

  return (
    <div className="register-bg">
      <Container className="d-flex justify-content-center align-items-center register-page">
        <Card className="register-card p-4 shadow-lg">
          <h2 className="text-center mb-4 fw-bold text-white">Create Account</h2>

          {error && <p className="error-msg text-center">{error}</p>}

          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Email</Form.Label>
              <Form.Control
                className="input-field"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                className="input-field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </Form.Group>

            <Button type="submit" className="register-btn w-100">
              Register
            </Button>
          </Form>

          <p className="mt-3 text-center text-white">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </Card>
      </Container>
    </div>
  );
}
