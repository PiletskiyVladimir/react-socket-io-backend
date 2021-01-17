const
    User = require('../models/User');

module.exports = (socket, io) => {
    socket.on('userStatusChanged', async (data) => {
        await User.update({ status: data.status }, {where: {
            id: data.id
        }});

        io.emit('otherUserStatusChanged', data);
    })
}