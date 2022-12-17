const app = require('./server')
const connectDB = require('./config/db');
require('dotenv').config();

// Connect to DataBase.
connectDB();

// PORT on app.
const PORT = process.env.PORT || 4000;

// Run server.
app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`);
})