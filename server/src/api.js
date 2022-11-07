// work with express server

const express = require('express');
const path = require('path');
const cors = require('cors');
const api = express();

api.use(cors({
    origin: 'http://localhost:3000',
}));

api.use(express.static(path.join(__dirname,"..", "public")));

// Send routes other than those above through Client index.html in public build
api.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..','public', 'index.html'));
})

//api.use('/', express.static('index.html'));

module.exports = api;