const app = require('./lib/app');
const pool = require('./lib/utils/pool');
const socket = require('socket.io');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`Started on ${PORT}`);
});

const io = socket(app.listen(8080, () => {
  console.log('Started on 8080');
}));

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
    io.sockets.in(room.emit('RECEIVE_MESSAGE', data));
    console.log(`${data.author} joined the chat`);
  });

  socket.on('SEND_QUESTION', (data) => {
    console.log(data, 'SEND_QUESTION');
    io.sockets.in(room).emit(
      'RECEIVE_QUESTION', data
    );
  });
});

process.on('exit', () => {
  console.log('Goodbye!');
  pool.end();
});
