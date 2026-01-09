import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Home.css";
import heroBg from "../assets/home1.jpg";

function Home() {
  const navigate = useNavigate();
  const [foodItems] = useState([
    {
      foodId: "pizza1",
      name: "Spicy Pizza Special",
      price: 1250,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300"
    },
    {
      foodId: "burger1",
      name: "Classic Cheese Burger",
      price: 890,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300"
    },
    {
      foodId: "croissant1",
      name: "Fresh Butter Croissant",
      price: 450,
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300"
    },
    {
      foodId: "pasta1",
      name: "Creamy Pasta Delight",
      price: 950,
      image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=300"
    },
  ]);

  // New state to track if user has items in cart
  const [cartCount, setCartCount] = useState(0);

  // Fetch current user's cart count
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await api.get("/cart");
        setCartCount(res.data.items?.length || 0);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setCartCount(0); // not logged in
      }
    };
    fetchCartCount();
  }, []);

  // Add item to cart
  const handleAddToCart = async (item) => {
    try {
      await api.post("/cart", {
        foodId: item.foodId,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image
      });
      alert(`${item.name} added to cart!`);

      // Update cart count after adding
      const res = await api.get("/cart");
      setCartCount(res.data.items?.length || 0);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to cart. Login first?");
      navigate("/login");
    }
  };

  return (
    <div className="home-page">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🍔</span>
          <span className="logo-text">Food <strong>Delivery</strong></span>
        </div>

        <div className="auth-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>

          {/* NEW Cart Button */}
          <button 
            className="cart-header-btn" 
            onClick={() => navigate("/cart")}
          >
            🛒 Cart {cartCount > 0 && `(${cartCount})`}
          </button>
        </div>
      </header>

      <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>We Deliver The Taste Of Life</h1>
            <p>Get It Delivered Right To Your Door!</p>
          </div>
        </div>
      </section>

      <section className="browse-section">
        <h2>Browse Food Category</h2>
        <div className="food-grid">
          {foodItems.map(item => (
            <div className="food-card" key={item.foodId}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="price">Rs. {item.price}</p>
              <button className="cart-btn" onClick={() => handleAddToCart(item)}>
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
