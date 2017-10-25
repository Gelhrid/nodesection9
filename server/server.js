const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

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

  // socket.emit('newMessage', {
  //   from: "myszka@gmail.com",
  //   text: "tresc maila",
  //   createdAt: 213
  // });

  // socket.on('createEmail', (newEmailData) => {
  //   console.log('create Email', newEmailData);
  // });

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'NEW user joined'));
  socket.on('createMessage', (createMessage, callback) => {
    console.log('new createMessage', createMessage);

    io.emit('newMessage', generateMessage(createMessage.from, createMessage.text));
    callback({j:'dup2a'});
    // socket.broadcast.emit('newMessage', {
    //   from: createMessage.from,
    //   text: createMessage.text,
    //   createdAt: new Date().getTime()
    // });
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
