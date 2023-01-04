let readyPlayerCount = 0
let roomNumber = 0

function listen (io) {
  const fibNamespace = io.of('/fib') // choose fib namespace

  io.on('connection', socket => {
    console.log('New client connected', socket.id)
    //let room = 'room' + roomNumber
    let room = 'room' + Math.floor(readyPlayerCount / 2) // create rooms for sets of 2 players

    // clientActions allows Cypress tests
    const clientActions = {
      onReady () {
        
        readyPlayerCount++
        socket.join(room)
        if (readyPlayerCount % 2 === 0) {
          io.to(room).emit('startGame', socket.id) // 2nd player will be referee
        }
        console.log(
          'client joined room ',
          room,
          'playerCount ',
          readyPlayerCount
        )
      }
    }

    socket.on('ready', clientActions.onReady)

    socket.on('begin', beginData => {
      socket.to(room).emit('begin', beginData)
    })

    socket.on('player2Name', player2Name => {
      socket.to(room).emit('player2Name', player2Name)
    })

    socket.on('next turn', turnData => {
      socket.to(room).emit('next turn', turnData, socket.id)
    })

    socket.on('leave game', () => {
      socket.to(room).emit('player left') // let client know other player left 
      socket.leave(room)
      readyPlayerCount--;
      readyPlayerCount = readyPlayerCount < 0 ? 0 : readyPlayerCount;
    })

    socket.on('other player left', () => { // this player leaves if the other player left
      socket.leave(room)
      readyPlayerCount--;
      readyPlayerCount = readyPlayerCount < 0 ? 0 : readyPlayerCount;
    })

    socket.on('disconnect', reason => {
      console.log('Client', socket.id, ' disconnected: ', reason)

      socket.leave(room) // rooms should not be perpetual, this is default behavior, just being explicit
    })
  })
}

module.exports = {
  listen
}
