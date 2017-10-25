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
  console.log('new newMessageData', newMessageData);
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

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User', text: jQuery('[name=message]').val()
  }, function(){
    console.log('Wiadomosc wyslana');
  });
});
