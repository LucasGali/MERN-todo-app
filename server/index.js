const connection = require('./db');
const cors = require('cors');
const express = require('express');

const app = express();

connection()

app.use(express.json())
app.use(cors())

app.use('/api/users', require('./routes/users'))
app.use('/api/tasks', require('./routes/tasks'))

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});