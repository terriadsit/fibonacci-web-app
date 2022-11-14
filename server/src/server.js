const fs = require('fs');
const path = require('path');
const http = require("https");  // change https to http and sockets work in online page
const io = require('socket.io'); // also change ENDPOINT in client/online.js to http

const apiServer = require("./api");  // the express handler

const options = {
  key: fs.readFileSync(path.join(__dirname,'key.pem')), // comment these lines out and sockets work in online
  cert: fs.readFileSync(path.join(__dirname,'cert.pem')), // comment these lines out and sockets work in online
}

const httpServer = http.createServer(options, apiServer);

const port = process.env.PORT || 8000;

const socketServer = io(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const sockets = require('./sockets')

httpServer.listen(port);
console.log(`listening on port ${port}`)

sockets.listen(socketServer);


