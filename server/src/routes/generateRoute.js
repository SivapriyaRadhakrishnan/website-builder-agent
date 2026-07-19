const express = require("express");
const router = express.Router();

const {
  health,
  generate,
} = require("../controllers/generateController");

router.get("/health", health);
router.post("/generate", generate);

module.exports = router;