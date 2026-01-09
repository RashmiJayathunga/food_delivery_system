import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Spicy Pizza Special",
      price: 1250,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300"
    },
    {
      id: 2,
      name: "Classic Cheese Burger",
      price: 890,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300"
    },
  ]);

  const handleQuantityChange = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-section">

        {cartItems.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: Rs. {item.price}</p>

                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  </div>

                  <p>Subtotal: Rs. {item.price * item.quantity}</p>

                  <button className="delete-btn" onClick={() => handleDeleteItem(item.id)}>
                    Delete Item
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <h3>Total: Rs. {totalPrice}</h3>
              <button onClick={() => navigate("/delivery")}>Proceed to Delivery</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;