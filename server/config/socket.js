module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('new socket');

    let rooms = [];

    socket.on('create', function(room) {
      console.log('room: ', room);
      socket.join(room.roomid);
    });

    socket.on('changeVideo', function(data) {
      console.log('emited, data: ', data);
      socket.broadcast.to(data.roomid).emit('changeVideo', data.videoId);
    })

    socket.on('shareCurrentTime', function(data) {
      console.log('Server data: ', data);
      socket.broadcast.to(data.roomid).emit('shareCurrentTime', data.currentTime);
    })

    socket.on('asd', (data) => {
      console.log(data);
      socket.emit('temp', {mes: 'temp from server'});
    });

    socket.on('click', (data) => {
      console.log(data);
      socket.emit('click_answer', {mes: 'thx for click'});
    })

  })
}