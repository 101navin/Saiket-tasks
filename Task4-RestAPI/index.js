// Import express
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());
// TEMP: request logger — helps debug incoming requests
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});

// TEMP: add a simple root route to quickly test connectivity
app.get('/', (req, res) => {
  res.send('API is running — root OK');
});


// Dummy user data (acts like a small DB)
let users = [
  { id: 1, name: "Naveen", email: "naveen@example.com", age: 21 },
  { id: 2, name: "Kumar", email: "kumar@example.com", age: 22 }
];

// Routes

// 1. Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// 2. Get single user by id
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// 3. Add a new user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 4. Update a user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.age = req.body.age || user.age;

  res.json(user);
});

// 5. Delete a user
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: "User deleted successfully" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
