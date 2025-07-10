
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) return res.status(400).json({ message: "Email already exists" });

  // ✅ Save plain text password (NOT RECOMMENDED)
  const user = new User({ name, email, password });
  await user.save();

  res.status(201).json({ message: "User registered successfully" });
});




app.post("/login_page", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });


if (password !== user.password) {
  return res.status(400).json({ message: "Invalid credentials" });
}


  res.status(200).json({ message: "Login successful" });
});




app.post("/forgot_password", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });

  // ✅ Update plain text password
  user.password = password;
  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
