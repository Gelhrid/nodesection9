const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

// console.log(__dirname + '/../public');
// console.log(path.join(__dirname, '..', 'public'));
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

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

  socket.on('join', (params, callback) =>{
      if(!isRealString(params.name) || !isRealString(params.room)){
        return callback('Name and room name are required.');
      }
      socket.join(params.room);
      //ta removeUser chyba bez tego daloby sie zhackowac i byc na twoj pokojach jak zmienie w url nazwe na ionny istniejacy pokoj albo cos takiego?
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);
      io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      //socket.leave(params.room) socket.leave('nazwa pokoju');
// var socketIds = io.sockets.adapter.rooms[params.room];
// console.log('sssssssssssssssssss', socketIds);
      //rozne metody
      //io.emit -> io.to('nazwa pokoju').emit
      //socket.broadcast.emit -> socket.broadcast.to('nazwa pokoju').emit
      //socket.emit

      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined`));
      callback();
  });

  socket.on('createMessage', (createMessage, callback) => {
    var user = users.getUser(socket.id);
    if(user && isRealString(createMessage.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name, createMessage.text));
    }
    // callback({j:'dup2a'});
    callback();
    // socket.broadcast.emit('newMessage', {
    //   from: createMessage.from,
    //   text: createMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });
  //https://www.google.com/maps?q=
  socket.on('createLocationMessage', (cords, callback) => {
    var user = users.getUser(socket.id);
    if(user){
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, cords.latitude, cords.longitude));
  }
    callback();
  });

  //to w tym poprzednim jest bo inaczej by nasluchiwalo pewnie na wsyztkie a tak na konkretny ten jeden
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} disconeted`));
    }
  });

});
//poza blokiem nie dziala!
// io.on('disconnect', (socket) => {
//   console.log('client  dissconected');
// });


server.listen(port, () => {
  console.log(`dziala na porcie ${port}`);
});
