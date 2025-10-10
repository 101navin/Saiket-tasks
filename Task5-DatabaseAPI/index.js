// index.js
const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const port = 5000;

app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",        
  host: "localhost",
  database: "userdb",  
  password: "root", 
  port: 5432,
});

// Test route
app.get("/", (req, res) => {
  res.send("PostgreSQL API is working!");
});

// 🟢 Get all users
app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

// 🔵 Add a new user
app.post("/users", async (req, res) => {
  const { name, email, age } = req.body;
  await pool.query("INSERT INTO users (name, email, age) VALUES ($1, $2, $3)", [name, email, age]);
  res.send("User added successfully!");
});

// 🟡 Update a user
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  await pool.query("UPDATE users SET name=$1, email=$2, age=$3 WHERE id=$4", [name, email, age, id]);
  res.send("User updated successfully!");
});

// 🔴 Delete a user
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
  res.send("User deleted successfully!");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
