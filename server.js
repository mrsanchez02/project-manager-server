const express = require('express');
const cors = require('cors');

// Create server.
const app = express();

// Enabling cors
app.use(cors());

// Enabling express.json
app.use(express.json({extended: true}));

// Import routes.
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/projects',require('./routes/projects'));
app.use('/api/tasks',require('./routes/tasks'));

module.exports = app;