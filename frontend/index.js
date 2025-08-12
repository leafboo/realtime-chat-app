console.log("Hello world")


function goToChatRoomPage(queryString) {
  window.location.href = `/chat-room.html?${queryString}`;
}


const form = document.getElementById('form')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const formData = new FormData(form)
  const params = new URLSearchParams(formData)
  goToChatRoomPage(params.toString())
})