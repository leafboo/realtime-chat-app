import { io } from 'socket.io-client'
const socket = io('http://localhost:3000') // the URL of the server

// 'connect' is a built in event that runs everytime the client connects to the server
socket.on('connect', () => {
  displayMessage(`You connected with id: ${socket.id}`)  
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