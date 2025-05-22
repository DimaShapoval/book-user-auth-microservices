const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

app.get('/books', async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM books');
  res.json(rows);
});

app.post('/books', async (req, res) => {
  const { title } = req.body;
  const [result] = await db.execute('INSERT INTO books (title) VALUES (?)', [title]);
  res.status(201).json({ id: result.insertId, title });
});

app.listen(5001, () => {
  console.log('Books service running on port 5001');
});
