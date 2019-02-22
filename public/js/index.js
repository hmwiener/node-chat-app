var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  // socket.emit('createMsg', {
  //   to: 'Msg Recipient',
  //   text: 'Here. Have a message!'
  // });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});


socket.on('newMsg', function(msg) {
  console.log('Message ', msg);
});
