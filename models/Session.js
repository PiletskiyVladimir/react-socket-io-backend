const
    { DataTypes, Model, INTEGER, STRING, DATE } = require('sequelize'),
    sequelize = require('../db');

class Session extends Model { }

Session.init({
    id: {
        type: INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: STRING(255)
    },
    userId: {
        type: INTEGER(10)
    },
    expiresIn: {
        type: DATE
    }
}, {
    sequelize,
    tableName: 'sessions',
    timestamps: false
})

module.exports = Session;