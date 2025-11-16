import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="overlay">
          <h1>Welcome to FoodApp</h1>
          <p>Delicious, Fast & Easy to Order</p>
          <Link to="/menu">
            <button className="explore-btn">Order Now</button>
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} FoodApp. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Home;
