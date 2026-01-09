import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DeliveryLocation.css";

const user = JSON.parse(localStorage.getItem("user"));

function DeliveryLocation() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");

  const handlePlaceOrder = () => {
    if (!location.trim()) {
      alert("Please enter your delivery location!");
      return;
    }

    alert(`Order placed! Your food will be delivered to: ${location}`);
    navigate("/");
  };

  return (
    <>
      {/* HEADER (same as Cart) */}
      <header className="header">
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-icon">🍔</span>
          <span className="logo-text">
            Food <strong>Delivery</strong>
          </span>
        </div>

        <div className="auth-buttons">
          <span className="user-name">
            Hi, {user?.fullName || "Guest"}
          </span>

          <button onClick={() => navigate("/cart")}>
            ⬅ Back to Cart
          </button>
        </div>
      </header>

      {/* DELIVERY PAGE */}
      <div className="delivery-page">
        <h1>Delivery Details</h1>

        <div className="delivery-card">
          <p>Please enter your delivery address:</p>

          <input
            type="text"
            placeholder="Enter your delivery location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div className="deliveryButton">
            <button onClick={handlePlaceOrder}>
              Place Order
            </button>

            <button onClick={() => navigate("/cart")}>
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveryLocation;
