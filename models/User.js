const
    { DataTypes, Model, INTEGER, STRING, TINYINT } = require('sequelize'),
    sequelize = require('../db');

class User extends Model {}

User.init({
    id: {
        type: INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: STRING(255)
    }, 
    lastName: {
        type: STRING(255)
    },
    login: {
        type: STRING(255)
    },
    password: {
        type: STRING(255)
    },
    status: {
        type: TINYINT(1)
    }
}, {
    sequelize,
    tableName: 'users',
    timestamps: false
})

module.exports = User;