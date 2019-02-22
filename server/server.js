const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newEmail', {
    from: 'person@wherever.com',
    text: 'Whazzup?',
    CreatedAt: 12345
  });

  socket.emit('newMsg', {
      from: 'Msg user',
      text: 'Message for you sir . . . ',
      createdAt: 9876
  });

  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  });

  socket.on('createMsg', (msg) => {
    console.log('User sent msg: ', msg);
  });

  socket.on('disconnect', (socket) => {
    console.log('User disconnected from server');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
