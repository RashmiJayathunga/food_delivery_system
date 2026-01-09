import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Cart from './pages/Cart';
import DeliveryLocation from './pages/DeliveryLocation';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/delivery" element={<DeliveryLocation />} />
      </Routes>
    </Router>
  );
}

export default App;