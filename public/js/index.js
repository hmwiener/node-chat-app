var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('createEmail', {
    to: 'someone@somewhere.org',
    text: 'What you want?'
  });

  socket.emit('createMsg', {
    to: 'Msg Recipient',
    text: 'Here. Have a message!'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newEmail', function(email) {
  console.log('New email ', email);
});

socket.on('newMsg', function(msg) {
  console.log('Message ', msg);
});
