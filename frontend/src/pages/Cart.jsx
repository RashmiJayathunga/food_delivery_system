import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Cart.css";
const user = JSON.parse(localStorage.getItem("user"));

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");
        setCartItems(res.data.items || []);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        alert("Failed to fetch cart. Login first?");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [navigate]);

  const handleQuantityChange = async (foodId, delta) => {
    const item = cartItems.find(i => i.foodId === foodId);
    if (!item) return;

    try {
      await api.post("/cart", {
        foodId,
        name: item.name,
        price: item.price,
        quantity: delta,
        image: item.image
      });
      const updatedCart = await api.get("/cart");
      setCartItems(updatedCart.data.items || []);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Failed to update cart");
    }
  };

  const handleDeleteItem = async (foodId) => {
    try {
      await api.delete(`/cart/${foodId}`);
      const updatedCart = await api.get("/cart");
      setCartItems(updatedCart.data.items || []);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Failed to delete item");
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) return <p>Loading cart...</p>;

  return (
  <>
    {/* CART HEADER */}
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>
        <span className="logo-icon">🍔</span>
        <span className="logo-text">Food <strong>Delivery</strong></span>
      </div>

      <div className="auth-buttons">
        <span className="user-name">
          Hi, {user?.fullName || "Guest"}
        </span>

        <button onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>
      </div>
    </header>

    {/* CART PAGE */}
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.foodId} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-des">
                <h3>{item.name}</h3>
                <p>Price: Rs. {item.price}</p>

                <div className="add">
                  <button onClick={() => handleQuantityChange(item.foodId, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.foodId, 1)}>+</button>
                </div>

                <p>Subtotal: Rs. {item.price * item.quantity}</p>

                <button className="delete" onClick={() => handleDeleteItem(item.foodId)}>
                  Delete
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: Rs. {totalPrice}</h3>
            <button onClick={() => navigate("/delivery")}>
              Proceed to Delivery
            </button>
          </div>
        </div>
      )}
    </div>
  </>
);

}

export default Cart;
