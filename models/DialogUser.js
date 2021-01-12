const
    { DataTypes, Model, INTEGER, STRING } = require('sequelize'),
    sequelize = require('../db');

class DialogUser extends Model {}

DialogUser.init({
    id: {
        type: INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    dialogId: {
        type: INTEGER(10)
    }, 
    userId: {
        type: INTEGER(10)
    }
}, {
    sequelize,
    tableName: 'DialogUsers',
    timestamps: false
})

module.exports = DialogUser;