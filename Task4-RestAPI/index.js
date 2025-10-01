const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json()); // Middleware to parse JSON

// Dummy data
let users = [
  { id: 1, name: "Naveen" },
  { id: 2, name: "Prakash" }
];

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// POST new user
app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, name: req.body.name };
  users.push(newUser);
  res.json({ message: "User added", user: newUser });
});

// PUT update user
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.name = req.body.name;
  res.json({ message: "User updated", user });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: "User deleted", users });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
