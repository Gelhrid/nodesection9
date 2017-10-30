var socket = io();

function scrollToBottom () {
    //selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')

    //hights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight')
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
      messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
      if(err){
          alert(err);
          window.location.href = '/';
      } else {
          console.log('No error');
      }
  });
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

socket.on('updateUserList', function(users){
  var ol = jQuery('<ol></ol>');
  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);

});

// socket.on('newEmail', function(email){
//   console.log('new email', email);
// });

socket.on('newMessage', function(newMessageData){
  var formattedTime = moment(newMessageData.createdAt).format('HH:mm');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: newMessageData.text,
    from: newMessageData.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
    // console.log('new newMessageData', newMessageData);

  // var li = jQuery('<li></li>');
  // // li.text(newMessageData.from+':' +newMessageData.text);
  // li.text(`${newMessageData.from} ${formattedTime}- ${newMessageData.text}`);
  // jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'frank', text: 'Hey!'
// }, function(g){
//   console.log('got it!!', g.j);
// });

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('HH:mm');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
      url:  message.url,
      from: message.from,
      createdAt: formattedTime
    });
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  // li.text(`${message.from} ${formattedTime} `);
  // a.attr('href', message.url);
  // li.append(a);
  jQuery('#messages').append(html);
  scrollToBottom();
});

var messageTextbox = jQuery('[name=message]');
jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    text: messageTextbox.val()
  }, function(e){
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
