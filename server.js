const app = require('./lib/app');
const pool = require('./lib/utils/pool');

const PORT = process.env.PORT || 7890;

const io = require('socket.io')(
  app.listen(PORT, () => {
    console.log(`Started on ${PORT}`);
  }), {
    cors: {
      origin: true
    }
  });

//Socket Connection
io.on('connection', (socket) => {
  console.log(socket.id, 'SOCKET ID');

  //Rooms
  let room = '';
  socket.on('ROOM', (data) => {
    room = data;

    socket.join(room);
    io.sockets.in(room).emit('connectToRoom', `You are in ${room}'s Classroom`);
  });

  //Send List of Rooms
  socket.on('GET_ROOMS', () => {
    socket.emit('ROOM_LIST', io.sockets.adapter.rooms);
  });

  //Messaging
  socket.on('SEND_MESSAGE', (data) => {
    console.log('MESSAGE RECEIVED');

    //io.sockets.in(room.emit('RECEIVE_MESSAGE', data));

    io.sockets.emit('RECEIVE_MESSAGE', data);

    console.log(`${data.author} joined the chat`);
  });

  socket.on('SEND_QUESTION', (data) => {
    console.log(data, 'SEND_QUESTION');

    //io.sockets.in(room).emit('RECEIVE_QUESTION', data);
    
    io.sockets.emit('RECEIVE_QUESTION', data);
  });
});

process.on('exit', () => {
  console.log('Goodbye!');
  pool.end();
});
