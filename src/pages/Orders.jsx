import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import "./Orders.css"; // ✅ Add new CSS file

function Orders() {
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    const flag = localStorage.getItem("orderPlaced");
    if (flag === "true") {
      setPlaced(true);
      localStorage.removeItem("orderPlaced");
    }
  }, []);

  return (
    <div className="orders-bg">
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
        <Card className="orders-card text-center p-4 rounded-4 shadow-lg">
          
          {placed ? (
            <>
              <h2 className="text-success fw-bold">🎉 Order Confirmed!</h2>
              <p className="text-dark">Your food is being prepared 🍽️</p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                alt="success"
                width="130"
                className="mx-auto mb-4"
              />
            </>
          ) : (
            <>
              <h2 className="text-danger fw-bold">No Orders Yet !</h2>
              <p className="text-dark">Please add items to cart and place an order </p>
            </>
          )}

          <Link to="/menu">
            <Button className="orders-btn mt-3 px-4 py-2 fw-semibold">Continue Shopping ...</Button>
          </Link>

        </Card>
      </Container>
    </div>
  );
}

export default Orders;
