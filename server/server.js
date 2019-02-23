const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMsg', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMsg', generateMessage('Admin', 'A new user has joined'));

  socket.on('createMsg', (msg, callback) => {
    console.log('User sent msg: ', msg);
    io.emit('newMsg', generateMessage(msg.from, msg.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMsg', generateLocationMessage('Admin', coords.lat, coords.long));
  });


  socket.on('disconnect', (socket) => {
    console.log('User disconnected from server');
  });

});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
