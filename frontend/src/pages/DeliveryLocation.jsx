import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DeliveryLocation.css";

function DeliveryLocation() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");

  const handlePlaceOrder = () => {
    if (location.trim() === "") {
      alert("Please enter your delivery location!");
      return;
    }
    alert(`Order placed! Your food will be delivered to: ${location}`);
    navigate("/");
  };

  return (
    <div className="delivery-page">
      <h1>Delivery Location</h1>
      <p>Enter your delivery address to get your order delivered:</p>

      <div className="delivery-form">
        <input
          type="text"
          placeholder="Enter your location..."
          value={location}
          onChange={e => setLocation(e.target.value)}
        />

      </div>
      <div className="deliveryButton">
        <button onClick={handlePlaceOrder}>Place Order</button>

        <button onClick={() => navigate("/cart")}>
          Back to Cart
        </button></div>
    </div>
  );
}

export default DeliveryLocation;
