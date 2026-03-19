require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/cors');
const path = require('path');
const verifyJWT = require('./middleware/verifyJWT');
const connectDB = require('./config/connectDB.js');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoSanitize = require('express-mongo-sanitize');
const PORT = process.env.PORT ;
const mongoose = require('mongoose');

connectDB();

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is running smoothly and database is connected',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.use(credentials);  
app.use(cors(corsOptions));                                                                                                      
app.use(express.urlencoded({ extended: false }));                                                                               
app.use(express.json());   
// Source - https://stackoverflow.com/a/79668053
// Posted by Mohammed Sersawy, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-19, License - CC BY-SA 4.0


app.use((req, res, next) => {
Object.defineProperty(req, 'query', {
    ...Object.getOwnPropertyDescriptor(req, 'query'),
    value: req.query,
    writable: true,
});
next();
});

app.use(mongoSanitize({
    allowDots: true,
    replaceWith: '_'
}));                                                                                                 
app.use(cookieParser());      

app.use('/register', require('./routes/register.js'));
app.use('/auth', require('./routes/auth.js'));
app.use('/logout', require('./routes/logout'));
app.use('/refresh', require('./routes/refresh'));
app.use(verifyJWT);

app.use('/tanks', require('./routes/tank.js'));


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});