import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import "../styles/Auth.css";
import loginVideo from "../assets/food-bg.mp4";

export default function Login() {
  const navigate = useNavigate();

  // Get token from Cognito redirect
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token"); // you'll get the JWT from Cognito if you set it up
    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) alert(data.message || "Login failed");
      else {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  const googleLogin = () => {
    const { COGNITO_DOMAIN, COGNITO_CLIENT_ID, COGNITO_REDIRECT_URI } = process.env;
    const url = `${COGNITO_DOMAIN}/oauth2/authorize?identity_provider=Google&redirect_uri=${COGNITO_REDIRECT_URI}&response_type=CODE&client_id=${COGNITO_CLIENT_ID}&scope=email+openid+profile`;
    window.location.href = url;
  };

  return (
    <div className="auth-page">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="auth-card">
        <div className="auth-image">
          <video autoPlay loop muted playsInline className="auth-video-content">
            <source src={loginVideo} type="video/mp4" />
          </video>
        </div>

        <div className="auth-container">
          <h2>Welcome Back</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input name="email" type="email" placeholder="Email Address" required />
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input name="password" type="password" placeholder="Password" required />
            </div>

            <button type="submit" className="btn-primary">Sign In</button>
          </form>

          <div className="divider"><span>Or continue with</span></div>

          <button className="social-btn" onClick={googleLogin}>
            <FaGoogle /> Google
          </button>

          <p>
            Don't have an account? <Link to="/signup">Join Now</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
