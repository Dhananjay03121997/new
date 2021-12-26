const express = require('express');
const app = express();

const tenant = require('./routes/tenant');
const login = require('./routes/login');
require('dotenv').config();
require('./db/db');
const PORT = process.env.PORT;

app.use(express.json());//To provide json for post patch requests

app.use(login);
app.use(tenant);

app.get('/', (req,res)=>{
    console.log('connection');
    res.send(`New App Started ON: ${PORT}`);
});

module.exports = app;