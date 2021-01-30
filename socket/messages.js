const
    Dialog      = require('../models/Dialog'),
    User        = require('../models/User'),
    DialogUser  = require('../models/DialogUser'),
    Message     = require('../models/Message');

module.exports = (socket, io) => {
    socket.on('sendMessage', async (data) => {
        let createdMessage = await Message.create({
            time: Date.now(),
            text: data.message,
            senderId: data.user,
            dialogId: data.room,
            messageType: 'userMessage'
        })

        io.to(createdMessage.dialogId).emit('messageReceived', {
            id: createdMessage.id,
            time: createdMessage.time,
            text: createdMessage.text,
            senderId: createdMessage.senderId,
            dialogId: createdMessage.dialogId
        })

        socket.broadcast.emit('emitToNotSelectedDialog', {
            id: createdMessage.id,
            time: createdMessage.time,
            text: createdMessage.text,
            senderId: createdMessage.senderId,
            dialogId: createdMessage.dialogId
        })
    });
}