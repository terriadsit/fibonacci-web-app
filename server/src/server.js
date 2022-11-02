const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 8000;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});


let readyPlayerCount = 0;

const fibNamespace = io.of('/fib') // choose fib namespace

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  let room = 'room' + Math.floor(readyPlayerCount / 2) // create rooms for sets of 2 players
    
  socket.on('ready', () => {
     
    socket.join(room);

    console.log('player ready', socket.id, room)
    readyPlayerCount++
    console.log('playercount', readyPlayerCount)
    if (readyPlayerCount % 2 === 0) {
      
      console.log('emit start game room', room, 'id',socket.id)
      socket.to(room).emit('startGame', socket.id) // 2nd player will be referee, track ball
    }
  });

  socket.on('next turn', (turnData) => {
    socket.to(room).emit('next turn', turnData);
    console.log('in server next turn', turnData);
  })

  
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    
  });

});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));

// server is running express and socket.io side by side
// const http = require('http');
// const io = require('socket.io');


// const apiServer = require('./api'); // the express handler
// const httpServer = http.createServer(apiServer);
// const socketServer = io(httpServer, {
//     cors: {
//       origin: '*',
//       methods: ['GET', 'POST']
//     }
//   });

// const sockets = require('./sockets');

// const PORT = process.env.PORT || 8000;


// httpServer.listen(PORT);
// console.log(`listening on port ${PORT}`);

// sockets.listen(socketServer);

