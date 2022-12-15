// Node server that will handle Socket.io connections

const io = require('socket.io')(8080);


const users = {}

// Listens to events eg like others join and lest other partcipants know
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        //console.log('New User : ', name);
        users[socket.id] = name;
        //console.log("All users :" , users);
        socket.broadcast.emit('user-joined',name);
    })

//If some sends message than broadcastit to all
    socket.on('send',message => {
        socket.broadcast.emit('receive',{message:message, name: users[socket.id]})
    })  

//If some left the message  than broadcastit to all
    socket.on('disconnect',message => {
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    })  
}) 