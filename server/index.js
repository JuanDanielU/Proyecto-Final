const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//Server
const app = express();

// Connect to DB
connectDB();
app.use(cors());

app.use(express.json());

app.use('/api/videos', require('./routes/video'));
app.use('/api/users', require('./routes/user'));

app.listen(4000, () => {
    console.log('Server running OK');
});