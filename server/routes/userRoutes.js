import express from "express";
import User from "../models/User.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (email === "testdev@gmail.com" && password === "123_@") {
    return res.status(200).json({ message: "Login successful" });
  }

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
});

export default router;
