const express = require("express");
const http = require("http");
const io = require('socket.io');

const apiServer = require("./api");  // the express handler
const httpServer = http.createServer(apiServer);

const port = process.env.PORT || 8000;

//const app = express();

//app.use(api);

//const server = http.createServer(app);

const socketServer = io(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const sockets = require('./sockets')

httpServer.listen(port);
console.log(`listening on port ${port}`)
//server.listen(port, () => console.log(`Listening on port ${port}`));

sockets.listen(socketServer);


