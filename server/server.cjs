console.log("Server is running...")
const io = require('socket.io')(3000, {
  cors: {
    origin: true // this allows any URL to make a request
  }
}) // Apparently this is a function????

io.on('connection', socket => { // runs everytime a client connects to a server and gives them a 'socket' instance
  console.log(`A user has connected with user id: ${socket.id}`) // random id assigned to a client when they connect
  socket.on('send-message', (message) => { // listens to event 'send-message' emitted by a user
    // io.emit('receive-message', message) -send message to every single socket
    socket.broadcast.emit('receive-message', message) // send message to every other users except me
  })
  socket.on('disconnect', (reason) => {
    console.log(reason)
  })
})