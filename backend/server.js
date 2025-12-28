const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// ============================================
// 🔥 CORS Configuration (IMPORTANT)
// ============================================
const allowedOrigins = [
  "http://localhost:5173",
  "https://civicpulse-livid.vercel.app"  // Your deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ============================================
// Middleware
// ============================================
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ============================================
// API Routes
// ============================================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// ============================================
// Global Error Handler
// ============================================
app.use((err, req, res, next) => {
  console.error("Global error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ============================================
// MongoDB + Server Start
// ============================================
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB");
    console.error(err.message);
    process.exit(1);
  });
