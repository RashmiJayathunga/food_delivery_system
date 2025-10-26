import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ enables navigation
import "../styles/Home.css";
import heroBg from "../assets/home1.jpg"; // ✅ your hero background image

function Home() {
  const navigate = useNavigate(); // ✅ for page navigation

  return (
    <div className="home-page">
      {/* ===== Header ===== */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🍔</span>
          <span className="logo-text">
            Food <strong>Delivery</strong>
          </span>
        </div>

        {/* ✅ Login & Signup buttons */}
        <div className="auth-buttons">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="signup-btn" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>We Deliver The Taste Of Life</h1>
            <p>Get It Delivered Right To Your Door!</p>

            <div className="search-bar">
              <input type="text" placeholder="Enter Your Food Name..." />
              <button className="find-btn">Find Food</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Browse Food Category Section ===== */}
      <section className="browse-section">
        <div className="browse-header">
          <h2>Browse Food Category</h2>
          <p>
            Explore our wide selection of delicious meals made fresh and
            delivered fast. There’s something for everyone’s taste!
          </p>
        </div>

        <div className="food-grid">
          <div className="food-card">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300"
              alt="Pizza"
            />
            <h3>Spicy Pizza Special</h3>
            <div className="rating">⭐⭐⭐⭐⭐</div>
            <p className="price">Rs. 1,250</p>
            <button className="cart-btn" onClick={() => navigate("/cart")}>
              Add To Cart
            </button>
          </div>

          <div className="food-card">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300"
              alt="Burger"
            />
            <h3>Classic Cheese Burger</h3>
            <div className="rating">⭐⭐⭐⭐⭐</div>
            <p className="price">Rs. 890</p>
            <button className="cart-btn" onClick={() => navigate("/cart")}>
              Add To Cart
            </button>
          </div>

          <div className="food-card">
            <img
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300"
              alt="Croissant"
            />
            <h3>Fresh Butter Croissant</h3>
            <div className="rating">⭐⭐⭐⭐⭐</div>
            <p className="price">Rs. 450</p>
            <button className="cart-btn" onClick={() => navigate("/cart")}>
              Add To Cart
            </button>
          </div>

          <div className="food-card">
            <img
              src="https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=300"
              alt="Pasta"
            />
            <h3>Creamy Pasta Delight</h3>
            <div className="rating">⭐⭐⭐⭐⭐</div>
            <p className="price">Rs. 950</p>
            <button className="cart-btn" onClick={() => navigate("/cart")}>
              Add To Cart
            </button>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <h3>🍔 Food <span>Delivery</span></h3>
            <p>Delivering happiness, one bite at a time!</p>
          </div>

          {/* ✅ Description Section */}
          <div className="footer-description">
            <p>
              Food Delivery is your one-stop platform for ordering fresh,
              tasty, and hygienic meals from your favorite restaurants. We
              bring the flavor of your city right to your doorstep quickly,
              safely, and affordably.
            </p>
          </div>

          {/* ✅ Address Section */}
          <div className="footer-address">
            <h4>📍 Address</h4>
            <p>123 Food Street,<br />Colombo, Sri Lanka</p>

            <h4>📞 Phone</h4>
            <p>+94 123 456 789</p>

            <h4>✉️ Email</h4>
            <p>support@fooddelivery.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Food Delivery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
