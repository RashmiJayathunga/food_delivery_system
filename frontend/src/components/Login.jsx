import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaApple } from "react-icons/fa";
import "../styles/Auth.css";
import loginVideo from "../assets/food-bg.mp4";
import api from "../api/axios";
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../firebase/firebase"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await api.post("/auth/login", { email, password });
      // Save token & user to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful!");
      navigate("/"); // Redirect to home/dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
  try {
    setIsLoading(true);

    const result = await signInWithPopup(auth, googleProvider);

    // ← Add this here to check the token
    const idToken = await result.user.getIdToken();
    console.log("ID Token:", idToken); // <-- Should log a JWT string

    const res = await api.post("/auth/google", { idToken });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/");
  } catch (err) {
    console.error(err);
    alert("Google login failed");
  } finally {
    setIsLoading(false);
  }
};



  return (
    <div className="auth-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-card"
      >
        <div className="auth-image">
          <video autoPlay loop muted playsInline className="auth-video-content">
            <source src={loginVideo} type="video/mp4" />
          </video>
        </div>

        <div className="auth-container">
          <div className="auth-header">
            <span className="brand-logo">🍔</span>
            <h2>Welcome <span className="highlight">Back</span></h2>
          </div>
          <p className="subtitle">The kitchen is waiting for you.</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="forgot-pass">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? <div className="spinner"></div> : "Sign In"}
            </button>
          </form>

          <div className="divider"><span>Or continue with</span></div>

          <div className="social-group">
            <button className="social-btn" onClick={handleGoogleLogin}>
              <FaGoogle /> Google
            </button>

            <button className="social-btn"><FaApple /> Apple</button>
          </div>

          <p className="footer-text">
            Don't have an account? <Link to="/signup" className="link">Join Now</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
