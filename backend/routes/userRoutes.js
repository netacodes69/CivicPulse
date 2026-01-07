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
  getUserProfile
);

// 🔥 CREATE REPORT
router.post(
  "/report",
  authMiddleware,
  upload.single("image"),
  createReport
);

// 🔥 MY REPORTS
router.get(
  "/my-reports",
  authMiddleware,
  getMyReports
);

// 🔥 UPDATE REPORT
router.put(
  "/report/:id",
  authMiddleware,
  updateReport
);

// 🔥 DELETE REPORT
router.delete(
  "/report/:id",
  authMiddleware,
  deleteReport
);

module.exports = router;
