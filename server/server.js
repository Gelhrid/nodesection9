const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

console.log(__dirname + '/../public');
console.log(path.join(__dirname, '..', 'public'));
const publicPath =path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');
  // socket.emit('newEmail', {
  //   from: "myszka@gmail.com",
  //   text: "tresc maila",
  //   createdAt: 213
  // });

  socket.emit('newMessage', {
    from: "myszka@gmail.com",
    text: "tresc maila",
    createdAt: 213
  });

  // socket.on('createEmail', (newEmailData) => {
  //   console.log('create Email', newEmailData);
  // });


  socket.on('createMessage', (createMessage) => {
    console.log('new createMessage', createMessage);
  });
  //to w tym poprzednim jest bo inaczej by nasluchiwalo pewnie na wsyztkie a tak na konkretny ten jeden
  socket.on('disconnect', (socket) => {
    console.log('client  dissconected');
  });

});
//poza blokiem nie dziala!
// io.on('disconnect', (socket) => {
//   console.log('client  dissconected');
// });


server.listen(port, () => {
  console.log(`dziala na porcie ${port}`);
});
