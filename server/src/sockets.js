let readyPlayerCount = 0;

function listen(io) {
  const fibNamespace = io.of('/fib') // choose fib namespace

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  let room = 'room' + Math.floor(readyPlayerCount / 2) // create rooms for sets of 2 players

  // clientActions allows Cypress tests
  const clientActions = {
    onReady() {
      socket.join(room);

      console.log('player ready', socket.id, room)
      readyPlayerCount++
      if (readyPlayerCount % 2 === 0) {
      
        console.log('emit start game room', room, 'id',socket.id)
        io.to(room).emit('startGame', socket.id) // 2nd player will be referee
      }
    },
    isOnline(username) {
      $('#messages').append($('<li>').html(username))
    },
  }
    
  socket.on('ready', clientActions.onReady)     //() => {
  
  socket.on('begin', (beginData) => {
    socket.to(room).emit('begin', beginData);
  });

  socket.on('player2Name', player2Name => {
    socket.to(room).emit('player2Name', player2Name);
  })

  socket.on('next turn', (turnData) => {
    socket.to(room).emit('next turn', turnData, socket.id);
 })

  
  socket.on('disconnect', reason => {
    console.log('Client', socket.id, ' disconnected: ', reason);
    socket.leave(room);  // rooms should not be perpetual, this is default behavior, just being explicit
  })

});
}

module.exports = {
    listen,
}