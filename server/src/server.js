// run socketServer and httpServer 
const fs = require('fs');
const path = require('path');
const { mongoConnect } = require('./services/mongo');
const http = require("http");  // change http to https and uncomment key, cert for https
const io = require('socket.io'); 

const apiServer = require("./api");  // the express handler

const options = {
  // key: fs.readFileSync(path.join(__dirname,'key.pem')), // comment these lines out for http instead of https
  // cert: fs.readFileSync(path.join(__dirname,'cert.pem')), // comment these lines out for http instead of https
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
sockets.listen(socketServer);

async function startServer() {
    await mongoConnect();
   
    httpServer.listen(port, () => {
        console.log('listening on port:', port)
    });
}

startServer();





