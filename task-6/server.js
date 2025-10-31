require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

app.get("/error", (req, res, next) => {
  const err = new Error("Error occurred");
  err.statusCode = 400;
  next(err);
});

// global error handler middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  const status = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({
    success: false,
    message: message,
  });
});

// importing data from .env
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
