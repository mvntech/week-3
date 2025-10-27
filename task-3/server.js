// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// middleware to parse JSON bodies
app.use(express.json());

// user data;
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// find user by id function
const findUserById = (id) => users.find((u) => u.id === id);

// GET: fetch all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// GET: fetch single user by id
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = findUserById(id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// POST: create new user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  // simple id generation
  const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = { id, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT: update a user
app.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const existingIndex = users.findIndex((u) => u.id === id);
  if (existingIndex === -1)
    return res.status(404).json({ error: "User not found" });

  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  users[existingIndex] = { id, name, email };
  res.json(users[existingIndex]);
});

// DELETE: removing a user
app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ error: "User not found" });

  const deleted = users.splice(index, 1)[0];
  res.json({ message: "User deleted", user: deleted });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
