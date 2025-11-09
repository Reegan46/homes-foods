import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./Admin.css"; // ✅ CSS Imported

const API = "http://localhost:5000";

function Admin() {
  const [foods, setFoods] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", img: "", desc: "" });

  useEffect(() => {
    fetchFoods();
  }, []);

  async function fetchFoods() {
    const res = await fetch(`${API}/foods`);
    const data = await res.json();
    setFoods(data);
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleAdd(e) {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };

    const res = await fetch(`${API}/foods`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      resetForm();
      fetchFoods();
    }
  }

  function startEdit(food) {
    setEditing(food);
    setForm({
      name: food.name,
      price: food.price,
      img: food.img,
      desc: food.desc,
    });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };

    const res = await fetch(`${API}/foods/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      resetForm();
      fetchFoods();
    }
  }

  function resetForm() {
    setEditing(null);
    setForm({ name: "", price: "", img: "", desc: "" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this item?")) return;
    await fetch(`${API}/foods/${id}`, { method: "DELETE" });
    fetchFoods();
  }

  return (
    <Container className="admin-container">
      <h2 className="admin-title text-center mb-4">
        Admin Panel — Food Management
      </h2>

      <Card className="mb-4 p-3 shadow-sm form-card">
        <h5 className="mb-3">{editing ? "Edit Food" : "Add New Food"}</h5>

        <Form onSubmit={editing ? handleUpdate : handleAdd}>
          <Row>
            <Col md={4} className="mb-2">
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Food Name"
                required
              />
            </Col>

            <Col md={2} className="mb-2">
              <Form.Control
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                required
              />
            </Col>

            <Col md={4} className="mb-2">
              <Form.Control
                name="img"
                value={form.img}
                onChange={handleChange}
                placeholder="Image URL"
              />
            </Col>

            <Col md={12} className="mb-2">
              <Form.Control
                name="desc"
                value={form.desc}
                onChange={handleChange}
                placeholder="Short Description"
              />
            </Col>
          </Row>

          <Button type="submit" variant="primary" className="me-2">
            {editing ? "Update" : "Add"}
          </Button>

          {editing && (
            <Button variant="secondary" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </Form>
      </Card>

      <h5 className="text-light mb-3">Food Items</h5>

      <Row>
        {foods.map((f) => (
          <Col md={4} className="mb-3" key={f.id}>
            <Card className="h-100 shadow-sm card-animate">
              <Card.Img
                variant="top"
                src={f.img || "https://via.placeholder.com/150"}
                className="food-image"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{f.name}</Card.Title>
                <Card.Text>₹{f.price}</Card.Text>
                <Card.Text className="text-muted small">{f.desc}</Card.Text>

                <div className="mt-auto d-flex gap-2">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => startEdit(f)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleDelete(f.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Admin;
