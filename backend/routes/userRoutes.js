const express = require("express");
const upload = require("../middleware/upload");
const router = express.Router();

const { authMiddleware, requireRole } = require("../middleware/authMiddleware");
const {
  getUserProfile,
  createReport,
  getMyReports,
  updateReport,
  deleteReport,
} = require("../controllers/userController");

// 🔥 PROFILE
router.get(
  "/profile",
  authMiddleware,
  requireRole("citizen"),
  getUserProfile
);

// 🔥 CREATE REPORT
router.post(
  "/report",
  authMiddleware,
  requireRole("citizen"),
  upload.single("image"),
  createReport
);

// 🔥 MY REPORTS
router.get(
  "/my-reports",
  authMiddleware,
  requireRole("citizen"),
  getMyReports
);

// 🔥 UPDATE REPORT
router.put(
  "/report/:id",
  authMiddleware,
  requireRole("citizen"),
  updateReport
);

// 🔥 DELETE REPORT
router.delete(
  "/report/:id",
  authMiddleware,
  requireRole("citizen"),
  deleteReport
);

module.exports = router;
