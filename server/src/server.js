const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const api = require("./api")

const port = process.env.PORT || 8000;
//const index = require("./routes/index");


const app = express();
//app.use(index);
app.use(api);

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
      io.to(room).emit('startGame', socket.id) // 2nd player will be referee, track ball
    }
  });

  socket.on('begin', (beginData) => {
    console.log('server begindata', beginData);
    socket.to(room).emit('begin', beginData);
  });

  socket.on('player2Name', player2Name => {
    console.log('server player2name', player2Name);
    socket.to(room).emit('player2Name', player2Name);
  })

  socket.on('next turn', (turnData) => {
    socket.to(room).emit('next turn', turnData);
    console.log('in server next turn', turnData);
  })

  
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    
  });

});


server.listen(port, () => console.log(`Listening on port ${port}`));


