import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();


// ===============================
// 🔹 GET LOGIN PAGE
// ===============================
router.get("/login", (req, res) => {
  res.render("login");
});


// ===============================
// 🔹 GET REGISTER PAGE
// ===============================
router.get("/register", (req, res) => {
  res.render("register");
});


// ===============================
// 🔹 REGISTER USER
// ===============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "User already exists");
      return res.redirect("/auth/register");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, { httpOnly: true });

    req.flash("success", "Registration successful!");
    res.redirect("/feed");

  } catch (error) {
    console.log(error);
    req.flash("error", "Registration failed");
    res.redirect("/auth/register");
  }
});


// ===============================
// 🔹 LOGIN USER
// ===============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/auth/login");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.flash("error", "Wrong password");
      return res.redirect("/auth/login");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, { httpOnly: true });

    req.flash("success", "Login successful!");
    res.redirect("/feed");

  } catch (error) {
    console.log(error);
    req.flash("error", "Login failed");
    res.redirect("/auth/login");
  }
});


// ===============================
// 🔹 LOGOUT
// ===============================
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  req.flash("success", "Logged out successfully");
  res.redirect("/auth/login");
});


export default router;