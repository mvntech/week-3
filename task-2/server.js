const express = require("express");
const app = express();

// port configuration
const PORT = 3000;

// middleware: simple logging for every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// route: GET 'api/hello'
app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from Express!",
    timestamp: new Date().toISOString(),
  });
});

// start the server
app.listen(PORT, () => {
  console.log(`Serve is running on http://localhost:${PORT}`);
});
