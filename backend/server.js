const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// ===================================================
// 🔥 CORS CONFIGURATION (MOST IMPORTANT)
// ===================================================
const allowedOrigins = [
  "http://localhost:5173",  // Dev
  "https://civicpulse-git-main-netacodes69s-projects.vercel.app", // Your live Vercel domain
  "https://civicpulse-livid.vercel.app" // keep only if required
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS Blocked: Not allowed origin ➤ " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

// for preflight OPTIONS
app.options("*", cors());

// ===================================================
// Middleware
// ===================================================
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===================================================
// API Routes
// ===================================================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Health check route (helpful for Render)
app.get("/", (req, res) => {
  res.send("CivicPulse Backend Running ✔");
});

// ===================================================
// Global Error Handler
// ===================================================
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.message);
  res.status(500).json({
    message: "Server Error",
    error: err.message,
  });
});

// ===================================================
// MongoDB + Server Start
// ===================================================
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
})
  .then(() => {
    console.log("📦 Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
