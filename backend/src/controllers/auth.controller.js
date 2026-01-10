import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import admin from "../config/firebaseAdmin.js"

export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body
    console.log("ID Token received:", idToken);
    const decoded = await admin.auth().verifyIdToken(idToken)
    console.log("Decoded Token:", decoded);
    let user = await User.findOne({ email: decoded.email })

    if (!user) {
      user = await User.create({
        fullName: decoded.name,
        email: decoded.email,
        googleId: decoded.uid,
        isGoogleUser: true,
      })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    })
  } catch (error) {
  console.error("Google auth error:", error);
  res.status(401).json({
    message: "Google authentication failed",
    error: error.message,
  });
}


}

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword
    })

    res.status(201).json({ message: "Signup successful" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
