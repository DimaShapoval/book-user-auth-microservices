const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

app.get('/users', async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM users');
  res.json(rows);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const [result] = await db.execute(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );
  res.status(201).json({ id: result.insertId, name, email });
});

app.listen(5002, () => {
  console.log('Users service running on port 5002');
});
