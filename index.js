const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Create server.
const app = express();

// Connect to DataBase.
connectDB();

// Enabling cors
app.use(cors());

// Enabling express.json
app.use(express.json({extended: true}));

// Import routes.
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/projects',require('./routes/projects'));
app.use('/api/tasks',require('./routes/tasks'));

// PORT on app.
const PORT = process.env.PORT || 4000;

// Run server.
app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`);
})