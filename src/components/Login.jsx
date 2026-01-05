import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaApple } from "react-icons/fa";
import "../styles/Auth.css";
// Replace this with your video file path
import loginVideo from "../assets/food-bg.mp4"; 

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-page">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="auth-card"
      >
        <div className="auth-image">
          {/* Video replaces the Image */}
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
          
          <form>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                required 
              />
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            
            <div className="forgot-pass">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn-primary">Sign In</button>
          </form>

          <div className="divider"><span>Or continue with</span></div>
          
          <div className="social-group">
            <button className="social-btn"><FaGoogle /> Google</button>
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