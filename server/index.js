const connection = require('./db');
const cors = require('cors');
const express = require('express');
const Auth = require('./routes/auth');
const tasks = require('./routes/tasks');
const verifyToken = require('./routes/validate-token');

const app = express();

connection()

app.use(express.json())
app.use(cors())

app.use('/api/users', Auth)
app.use('/api/tasks', verifyToken, tasks)

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});