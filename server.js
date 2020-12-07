const express = require('express');
const connectDB = require('./config/db');

const app = express();
//  Connect Database
connectDB();

//init Middleware
app.use(express.json({extended:false}));

app.get('/',(req, res) => res.send('it is working!'));


// Define Routesnpm 
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/admin', require('./routes/api/admin'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server Started at: '+ PORT));

