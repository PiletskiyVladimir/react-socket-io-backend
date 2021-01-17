const
    Dialog = require('../models/Dialog'),
    User = require('../models/User'),
    DialogUser = require('../models/DialogUser'),
    Message = require('../models/Message'),
    { Op } = require('sequelize');

async function getAllDialogs(req, res) {
    let resultedArr = [], dialogUsers, lastMessage;

    try {
        dialogUsers = await DialogUser.findAll({ where: { userId: req.params.id } })
    } catch (error) {
        return res.status(403).end();
    }

    for await (let dialogUser of dialogUsers) {
        let innerUserDialog = await DialogUser.findOne({
            where: {
                dialogId: dialogUser.dialogId,
                userId: {
                    [Op.ne]: dialogUser.userId
                }
            }
        })

        let innerUser = await User.findOne({
            where: {
                id: innerUserDialog.userId
            }
        })

        lastMessage = await Message.findOne({
            where: {
                dialogId: dialogUser.dialogId
            }, order: [['time', "DESC"]]
        })

        resultedArr.push({
            id: dialogUser.dialogId,
            innerUser: {
                id: innerUser.id,
                name: innerUser.name,
                lastName: innerUser.lastName,
                login: innerUser.login,
                status: innerUser.status
            },
            message: lastMessage
        })
    }

    return res.status(200).send(resultedArr);
}

async function getAllDialogMessages(req, res) {
    let count = await Message.count({ where: { dialogId: req.params.id } });

    let messages;

    if (count > 100) {
        messages = await Message.findAll({ where: { dialogId: req.params.id, messageType: 'userMessage' }, limit: 100, offset: count - 100 });
    } else {
        messages = await Message.findAll({ where: { dialogId: req.params.id, messageType: 'userMessage' } });
    }

    return res.status(200).send({
        messages: messages
    })
}

async function GetUserInfo(req, res) {
    let user = await User.findOne({ where: { id: req.params.id } })

    if (user == null) {
        return res.status(400).end();
    }

    return res.status(200).send({
        name: user.name,
        lastName: user.lastName,
        login: user.login
    })
}

module.exports = {
    getAllDialogs,
    getAllDialogMessages,
    GetUserInfo
}