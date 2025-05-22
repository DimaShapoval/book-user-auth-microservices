const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

const SECRET = 'secretkey';

app.post('/login', async (req, res) => {
  const { email } = req.body;
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

  if (rows.length === 0) return res.status(401).json({ message: 'Unauthorized' });

  const user = rows[0];
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });

  res.json({ token });
});

app.listen(5003, () => {
  console.log('Auth service running on port 5003');
});
