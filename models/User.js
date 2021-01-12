const
    { DataTypes, Model, INTEGER, STRING } = require('sequelize'),
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
    }
}, {
    sequelize,
    tableName: 'users',
    timestamps: false
})

module.exports = User;