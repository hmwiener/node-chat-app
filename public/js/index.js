var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});


socket.on('newMsg', function(msg) {
  console.log('Message ', msg);
  var li = jQuery('<li></li>');
  li.text(`From: ${msg.from}   ${msg.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMsg', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
