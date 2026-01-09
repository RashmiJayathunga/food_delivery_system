import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import "../styles/Auth.css";
import signupVideo from "../assets/food-bg.mp4";
import api from "../api/axios"; 

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // for redirect after signup

    const formik = useFormik({
        initialValues: { fullName: "", email: "", password: "" },
        validationSchema: Yup.object({
            fullName: Yup.string().min(3, "Too short!").required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().min(8, "Min 8 characters").required("Required"),
        }),
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const res = await api.post("/auth/signup", values); // <-- send to backend
                alert(res.data.message); // "Signup successful"
                navigate("/login"); // redirect to login page
            } catch (err) {
                alert(err.response?.data?.message || "Signup failed");
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <div className="auth-page">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="auth-card row-reverse"
            >
                <div className="auth-image">
                    <video autoPlay loop muted playsInline className="auth-video-content">
                        <source src={signupVideo} type="video/mp4" />
                    </video>
                    <div className="image-overlay-text">
                        <h3>Freshness Delivered.</h3>
                        <p>Join 10,000+ foodies today.</p>
                    </div>
                </div>

                <div className="auth-container">
                    <div className="auth-header">
                        <span className="brand-logo">🍔</span>
                        <h2>Create <span className="highlight">Account</span></h2>
                    </div>
                    <p className="subtitle">Experience the best meals in your city.</p>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="input-group">
                            <FaUser className="input-icon" />
                            <input type="text" placeholder="Full Name" {...formik.getFieldProps("fullName")} />
                        </div>
                        <div className="input-group">
                            <FaEnvelope className="input-icon" />
                            <input type="email" placeholder="Email Address" {...formik.getFieldProps("email")} />
                        </div>
                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create Password"
                                {...formik.getFieldProps("password")}
                            />
                            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <button type="submit" className="btn-primary" disabled={isLoading}>
                            {isLoading ? <div className="spinner"></div> : <>Get Started <FaArrowRight /></>}
                        </button>
                    </form>

                    <p className="footer-text">
                        Already a member? <Link to="/login" className="link">Login</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
