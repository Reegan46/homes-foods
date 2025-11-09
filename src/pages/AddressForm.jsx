import React, { useState, useContext } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
// import "./Address.css"; // ✅ CSS file linked

export default function DeliveryForm() {
  const { cart, resetCart } = useContext(CartContext);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    pincode: "",
    houseNo: "",
    street: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in form) {
      if (!form[key]) {
        alert("Please fill all fields");
        return;
      }
    }

    const order = {
      items: cart,
      total: cart.reduce((t, item) => t + item.price, 0),
      deliveryDetails: form,
      date: new Date().toISOString(),
    };

    localStorage.setItem("orderPlaced", "true");
    localStorage.setItem("latestOrder", JSON.stringify(order));

    resetCart();
    navigate("/orders");
  };

  return (
    <div className="delivery-page">
      <Container className="form-container">
        <Card className="delivery-card p-4 shadow-lg rounded-4">
          <h3 className="mb-4 fw-bold text-center text-dark">Delivery Details</h3>

          <Form onSubmit={handleSubmit}>
            {/* Full Name */}
            <Form.Label className="fw-semibold">Full Name</Form.Label>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Control
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </Col>
            </Row>

            {/* Address */}
            <Form.Label className="fw-semibold">Address</Form.Label>

            <Form.Group className="mb-3">
              <Form.Control
                name="street"
                type="text"
                placeholder="Street Address"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                name="houseNo"
                type="text"
                placeholder="House No / Building"
                onChange={handleChange}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Control
                  name="phone"
                  type="text"
                  maxLength="10"
                  placeholder="Phone Number"
                  onChange={handleChange}
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  name="pincode"
                  type="text"
                  maxLength="6"
                  placeholder="Pincode"
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Button type="submit" className="w-100 py-2 fw-semibold">
              Confirm Order ✅
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
