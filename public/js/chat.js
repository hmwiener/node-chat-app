var socket = io();

function scrollToBottom () {
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  //console.log(clientHeight, scrollTop, newMessageHeight, lastMessageHeight, scrollHeight);

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }

};

socket.on('connect', function() {
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('no error');
    }
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user))
  });

  jQuery('#users').html(ol);
});

socket.on('newMsg', function(msg) {
  var template = jQuery('#message-template').html();
  var formattedTime = moment(msg.createdAt).format('h:mm a');

  var html = Mustache.render(template, {
    from: msg.from,
    sent: formattedTime,
    text: msg.text
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMsg', function (msg) {
  var template = jQuery('#location-message-template').html();
  var formattedTime = moment(msg.createdAt).format('h:mm a');

  var html = Mustache.render(template, {
    from: msg.from,
    sent: formattedTime,
    url: msg.url
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var msgTextBox = jQuery('[name=message]');

  socket.emit('createMsg', {
    text: msgTextBox.val()
  }, function () {
    msgTextBox.val('');
  });
});

var locationButton = jQuery("#send-location");
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending . . .');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      long: position.coords.longitude
    });
  }, function () {
     alert('Unable to fetch location');
     locationButton.removeAttr('disabled').text('Send Location');
  });
});
