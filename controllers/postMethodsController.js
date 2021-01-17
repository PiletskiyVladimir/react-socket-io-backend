const
    Dialog = require('../models/Dialog'),
    Session = require('../models/Session'),
    User = require('../models/User'),
    DialogUser = require('../models/DialogUser'),
    Message = require('../models/Message'),
    md5 = require('md5'),
    moment = require('moment'),
    { Op } = require('sequelize');

async function Login(req, res) {
    let io = req.app.locals.io;
    let user = await User.findOne({ where: { login: req.body.login, password: req.body.password } })

    if (user == null) {
        return res.status(404).end();
    }

    await User.update({ status: 1 }, {
        where: {
            id: user.id
        }
    });

    io.emit('otherUserStatusChanged', {
        id: user.id,
        status: 1
    })

    let token = md5(user.id + moment().valueOf());

    await Session.create({
        token: token,
        userId: user.id,
        expiresIn: moment(moment().valueOf() + 86400000).format('YYYY-MM-DD HH:mm:ss')
    })

    return res.status(200).send({
        token: token,
        id: user.id,
        user: {
            name: user.name,
            lastName: user.lastName,
            login: user.login
        }
    })
}

async function RegUser(req, res) {
    let io = req.app.locals.io;

    let user = await User.create({
        name: req.body.name,
        lastName: req.body.lastName,
        login: req.body.login,
        password: req.body.password
    })

    let otherUsers = await User.findAll({
        where: {
            id: {
                [Op.notIn]: [user.id]
            }
        }
    })

    let emmitedData = [];

    for await (let otherUser of otherUsers) {
        let createdDialog = await Dialog.create();

        await DialogUser.create({
            dialogId: createdDialog.id,
            userId: otherUser.id
        })

        await DialogUser.create({
            dialogId: createdDialog.id,
            userId: user.id
        })

        let createdMessage = await Message.create({
            time: Date.now(),
            text: 'Start of conversation',
            senderId: 0,
            dialogId: createdDialog.id,
            messageType: 'adminMessage'
        })

        emmitedData.push({
            id: createdDialog.id,
            innerUser: otherUser,
            user: user,
            message: createdMessage
        })
    }

    io.emit('userRegistered', emmitedData)

    return res.status(200).end();
}

async function CheckToken(req, res) {
    let io = req.app.locals.io;
    let token = await Session.findOne({
        where: {
            token: req.body.token
        }
    })

    if (token == null) {
        return res.status(400).end();
    }

    if (moment().valueOf() > moment(token.expiresIn).valueOf()) {
        return res.status(400).end();
    }

    await User.update({ status: 1 }, {
        where: {
            id: token.userId
        }
    });

    io.emit('otherUserStatusChanged', {
        id: token.userId,
        status: 1
    })

    return res.status(200).send();
}

module.exports = {
    Login,
    RegUser,
    CheckToken
}