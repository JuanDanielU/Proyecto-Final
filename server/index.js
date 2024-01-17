const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//Server
const app = express();

// Connect to DB
connectDB();
app.use(cors());

app.use(express.json());

app.use('/api/videos', require('./routes/video')); // route for videos
app.use('/api/users', require('./routes/user')); // route for users
app.use('/api/comments', require('./routes/comment')); // route for comments

app.listen(4000, () => {
    console.log('Server running OK');
});