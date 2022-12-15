
const socket = io('http://localhost:8080', { transports : ['websocket'] });


//Get DOM elements in respective JS elemets

const form = document.getElementById('sendContainer');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

//Function that appends event info to the container

const append = (message , position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}


//Prompt new user for name 
const nm = prompt("Enter your name to Join the Chat Room.........");
socket.emit('new-user-joined', nm);

//Let others know if someone joined the chat room
socket.on('user-joined', name => {
    append(`${name} has joined the Samwaad..👋`, 'right');
})

//Let others receive chat what is being typed
socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left');
})

//Let others know if someone has left the chat
socket.on('leave', nm => {
    append(`${nm} has left the Chat room !!`, 'right');
})

//  Send messages to server so that broadcast to rest of partcipants
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value='';

})