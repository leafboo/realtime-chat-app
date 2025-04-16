console.log("Hello world")
let inputElementValue = ''
function addUser(event) {
  event.preventDefault();

  const inputElement = document.getElementById('username');
  inputElementValue = inputElement.value;

  console.log(inputElementValue);
  console.log("You have pressed the button!")
  goToChatRoomPage();
}
function goToChatRoomPage() {
  window.location.href = '/chat-room';
}

// Run once the html is done being rendered
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('enterButton').addEventListener('click', addUser)
})