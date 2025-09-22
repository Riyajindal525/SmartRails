// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register User
router.post("/register", async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const user = new User({ email, password, role });
        await user.save();

        res.json({ msg: "User registered successfully", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login User
router.post("/login", async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const user = await User.findOne({ email, password, role });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        res.json({ msg: "Login successful", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
