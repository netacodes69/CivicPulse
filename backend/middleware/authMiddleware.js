const jwt = require("jsonwebtoken");

// ===============================
// 🔐 AUTH MIDDLEWARE
// ===============================
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // 🔍 DEBUG: confirm token payload
    console.log("✅ TOKEN DECODED:", {
      id: decoded.id,
      role: decoded.role,
      username: decoded.username,
    });

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ===============================
// 🔒 ROLE GUARD (DEBUG ENABLED)
// ===============================
const requireRole = (role) => {
  return (req, res, next) => {
    // 🔍 DEBUG: role comparison
    console.log("🔍 ROLE CHECK:", {
      fromToken: req.user?.role,
      required: role,
      type: typeof req.user?.role,
    });

    if (
      !req.user?.role ||
      req.user.role.toLowerCase() !== role.toLowerCase()
    ) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient role" });
    }

    next();
  };
};

module.exports = {
  authMiddleware,
  requireRole,
};
