const
    { DataTypes, Model, INTEGER, STRING, DATE, TEXT } = require('sequelize'),
    sequelize = require('../db');

class Message extends Model {}

Message.init({
    id: {
        type: INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    time: {
        type: DATE
    },
    text: {
        type: TEXT('long')
    },
    senderId: {
        type: INTEGER(10)
    },
    dialogId: {
        type: INTEGER(10)
    },
    messageType: {
        type: STRING(255)
    }
}, {
    sequelize,
    tableName: 'messages',
    timestamps: false
})

module.exports = Message;