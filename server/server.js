const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required.');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    //socket.keave(params.room) ==> leaves room
    //io.to(room).emit ==> sends to everyone in room
    //socket.broadcast.to(room).emit ==> sends to everyone in room except sender
    //socket.emit ==> sends to single user in room

    socket.emit('newMsg', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMsg', generateMessage('Admin', `${params.name} has joined the room`));

    callback();
  });

  socket.on('createMsg', (msg, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(msg.text)) {
      io.to(user.room).emit('newMsg', generateMessage(user.name, msg.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMsg', generateMessage(user.name, coords.lat, coords.long));
    }
  });


  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMsg', generateMessage('Admin', `${user.name} has left the room.`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
