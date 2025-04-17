// important note: every tab opened has its own client.js code running
import { io } from 'socket.io-client'
const socket = io('http://localhost:3000') // the URL of the server

// 'connect' is a built in event that runs everytime the client connects to the server
socket.on('connect', () => {
  displayMessage(`You connected with id: ${socket.id}`)  
})

socket.on('disconnect', (reason) => { // listens when the server has disconnected
  console.log(`the server has disconnected. Reason: ${reason}`)
})

socket.on('user-disconnection', message => {
  displayMessage(message)
})

socket.emit('custom-event', 'you have been hacked chump')

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.getElementById("message-container").append(div)
}

const form = document.getElementById("form")
const inputField = document.getElementById("inputField")

socket.on('receive-message', message => { // listens to event 'receive message'
  displayMessage(message)
})


form.addEventListener("submit", event => {
  event.preventDefault()
  const message = inputField.value 
  
  if (message == "") {
    return
  } else {
    displayMessage(message)
    inputField.value = ""

    socket.emit('send-message', message) // emits the event 'send-message' to the server
  }
})