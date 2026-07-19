const express = require("express");
const cors = require("cors");

const generateRoutes = require("./routes/generateRoute");
const previewRoutes = require("./routes/previewRoutes");

const app = express();

// ======================
// Middleware
// ======================
app.use((req, res, next) => {
  console.log("Content-Type:", req.headers["content-type"]);
  next();
});
app.use(cors());
app.use(express.json());

// ======================
// Health Check
// ======================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Website Builder API is running",
  });
});

// ======================
// Routes
// ======================

app.use("/api", generateRoutes);

app.use("/api/preview", previewRoutes);

// ======================

module.exports = app;