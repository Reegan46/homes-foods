import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import "./Nav.css"; 

function NavigationBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-text">
           Kompz...
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="nav-links" />
        <Navbar.Collapse id="nav-links">
          {user && (
            <Nav className="ms-auto nav-links">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/menu">Menu</Nav.Link>

              <Nav.Link as={Link} to="/cart" className="position-relative">
                Cart
                {cart.length > 0 && (
                  <Badge className="cart-badge">{cart.length}</Badge>
                )}
              </Nav.Link>

              <Nav.Link as={Link} to="/orders">Orders</Nav.Link>

              {user.role === "admin" && (
                <Nav.Link as={Link} to="/admin" className="admin-link">
                  Admin
                </Nav.Link>
              )}

              <Nav.Link onClick={handleLogout}>
                Logout
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
