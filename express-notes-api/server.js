const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// custom logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});
// routes
const notesRouter = require("./routes/notesRoute");
app.use("/api/notes", notesRouter);

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// launch server
app.listen(PORT, () => {
  console.log(`Notes API server running on http://localhost:${PORT}`);
});
