var socket = io();

socket.on('connect', function() {
  console.log('connected to the server');
//tutaj dodajemy to zeby sie wywolywalo tylko w tedy gdy mamy polaczenie
  // socket.emit('createEmail', {
  //   to: 'michal.ddd@gmail.com',
  //   text: "mail do michala"
  // });

  // socket.emit('createMessage', {
  //   from: 'michal.ddd@gmail.com',
  //   text: "mail do michala"
  // });
      });


  socket.on('disconnect', function() {
    console.log('disconnect from  the server');
});

// socket.on('newEmail', function(email){
//   console.log('new email', email);
// });

socket.on('newMessage', function(newMessageData){
    // console.log('new newMessageData', newMessageData);
  var li = jQuery('<li></li>');
  // li.text(newMessageData.from+':' +newMessageData.text);
  li.text(`${newMessageData.from}: ${newMessageData.text}`);
  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'frank', text: 'Hey!'
// }, function(g){
//   console.log('got it!', g.j);
// });

socket.on('newLocationMessage', function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}`);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

var messageTextbox = jQuery('[name=message]');
jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val('')
  });
});


var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser!');
  }
  locationButton.attr('disabled', 'disabled').text('sendin location...');
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, function () {
      locationButton.removeAttr('disabled').text('SEND Location');
    })
  }, function(){
    locationButton.removeAttr('disabled').text('SEND Location');
    alert('unable to fetch location');
  });
});
