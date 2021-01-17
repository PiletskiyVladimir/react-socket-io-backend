module.exports = (socket, io) => {
    socket.on('roomJoin', async (data) => {
        socket.join(data.room);
        console.log('user ' + data.user + " connected to room " + data.room);
    });
    socket.on('roomLeave', async (data) => {
        socket.leave(data.room);
        console.log('user ' + data.user + " disconnected from room " + data.room);
    });
}