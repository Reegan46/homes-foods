import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const API = "http://localhost:5000";

function Menu() {
  const { addToCart } = useContext(CartContext);

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    fetchFoods();
  }, []);

  async function fetchFoods() {
    try {
      const res = await fetch(`${API}/foods`);
      const data = await res.json();
      setFoods(data);
    } catch (error) {
      console.error("Error loading foods:", error);
    }
  }

  // Searching + Price Filter Logic
  const filteredFoods = foods
    .filter((food) =>
      food.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((food) => {
      if (priceFilter === "200") return food.price < 200;
      if (priceFilter === "500") return food.price < 500;
      if (priceFilter === "above500") return food.price >= 500;
      return true;
    });

  return (
    <div className="menu-page">
      <Container className="pt-5">

        {/* Search Input + Price Filter */}
        <Row className="mb-4 justify-content-center">
          <Col md={3} sm={6} xs={12} className="mb-2">
            <Form.Control
              type="text"
              placeholder="🔍 Search Food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ height: "38px", fontSize: "14px" }}
            />
          </Col>

          <Col md={3} sm={6} xs={12}>
            <Form.Select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              style={{ height: "38px", fontSize: "14px" }}
            >
              <option value="">Filter by Price</option>
              <option value="200">Below ₹200</option>
              <option value="500">Below ₹500</option>
              <option value="above500">Above ₹500</option>
            </Form.Select>
          </Col>
        </Row>

        <h2 className="mb-4 text-center text-white menu-title">Our Delicious Menu</h2>

        {/* Menu Cards Display */}
        <Row>
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <Col key={food.id} md={3} sm={6} xs={12} className="mb-4">
                <Card className="menu-card">
                  <Card.Img
                    variant="top"
                    src={food.img}
                    alt={food.name}
                    className="menu-img"
                  />
                  <Card.Body className="text-center">
                    <Card.Title className="food-title">{food.name}</Card.Title>
                    <Card.Text className="food-price">₹{food.price}</Card.Text>

                    {/* Description Display */}
                    <Card.Text className="food-desc">
                      {food.desc ? food.desc : "No description available"}
                    </Card.Text>

                    <Button
                      className="add-btn"
                      onClick={() => {
                        addToCart(food);
                        alert("Item added to cart!");
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-white text-center">No items found!</p>
          )}
        </Row>
      </Container>
    </div>
  );
}
export default Menu;