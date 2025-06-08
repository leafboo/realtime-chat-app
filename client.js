// important note: every tab opened has its own client.js code running
import { io } from 'socket.io-client'
const socket = io('http://localhost:3000') // the URL of the server

// 'connect' is a built in event that runs everytime the client connects to the server
socket.on('connect', () => {
  displayConnectionId(`You connected with id: ${socket.id}`)
})

socket.on('receive-message-new-user', ({ username }) => {
  const div = document.createElement("div");
  div.textContent = `${username} has joined the chat`
  div.className = "new-connection-message"
  document.getElementById("message-container").append(div)
})

socket.on('disconnect', (reason) => { // listens when the server has disconnected
  console.log(`the server has disconnected. Reason: ${reason}`)
})

socket.on('receive-message', ({ name, message }) => { // listens to event 'receive message'
  displayUserMessage(name, message)
})

socket.on('user-disconnection', message => {
  const div = document.createElement("div");
  div.textContent = message;
  div.className = "disconnection-message"
  document.getElementById("message-container").append(div)
})

function displayConnectionId(message) {
  const id = document.getElementById("connection-id")
  id.textContent = message
}

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.getElementById("message-container").append(div)
}
function displayUserMessage(name, message) {
  const div = document.createElement("div");
  div.textContent = `${name}: ${message}`
  document.getElementById("message-container").append(div)
}

const form = document.getElementById("form")
const inputField = document.getElementById("inputField")


const queryString = window.location.search;
const URLParams = new URLSearchParams(queryString)
const username = URLParams.get('username')

socket.emit('newUser', username)


form.addEventListener("submit", event => {
  event.preventDefault()
  const message = inputField.value 
  
  if (message == "") {
    return
  } else {
    displayUserMessage(username, message)
    inputField.value = ""

    socket.emit('send-message', { // emits the event 'send-message' to the server
      name: username,
      message: message
    })
  }
})

// Welcome text to the user
const header = document.getElementById('welcome-user')
const span = document.createElement('span')
span.textContent = `Welcome ${username}`
header.append(span)

