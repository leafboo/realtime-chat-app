console.log("Server is running...")
const io = require('socket.io')/*(3000, {
  cors: {
    origin: true // this allows any URL to make a request
  }
}) // Apparently this is a function????
 */ //idk if this is needed, the "3000" when deploying the code

io.on('connection', socket => { // runs everytime a client connects to a server and gives them a 'socket' instance
  let clientUsername // every client has this variable instance
  socket.on('send-message', ({ name, message }) => { // listens to event 'send-message' emitted by a user
    // io.emit('receive-message', message) -send message to every single socket
    socket.broadcast.emit('receive-message', { name: name, message: message}) // send message to every other users except me
  })

  socket.on('newUser', (username) => {
    clientUsername = username
    socket.broadcast.emit('receive-message-new-user', { username: username })
  })
  
  socket.on('disconnect', (reason) => {
    socket.broadcast.emit('user-disconnection', `${clientUsername} has left the chat`)
   
  })
})