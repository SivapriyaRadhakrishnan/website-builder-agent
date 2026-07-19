const express = require("express");
const router = express.Router();
const { preview } = require("../controllers/previewController");

router.post("/", (req, res, next) => {
  console.log("✅ /api/preview route hit");
  next();
}, preview);

module.exports = router;