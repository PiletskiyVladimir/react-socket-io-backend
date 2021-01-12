const
    { DataTypes, Model, INTEGER, STRING, DATE } = require('sequelize'),
    sequelize = require('../db');

class Dialog extends Model {}

Dialog.init({
    id: {
        type: INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    createdAt: {
        type: DATE
    }, 
    updatedAt: {
        type: DATE
    }
}, {
    sequelize,
    tableName: 'Dialogs',
    timestamps: false
})

module.exports = Dialog;