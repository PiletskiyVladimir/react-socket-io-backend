const
	{ Sequelize } = require('sequelize'),
	fs = require('fs'),
    path = require('path'),
    settings = require('./settings.json');

const sequelize = new Sequelize(settings.database.dbname, settings.database.user, settings.database.pass, {
    host: settings.database.host,
    dialect: 'mysql',
	timezone: '+03:00',
	
	logging: false,

    retry  : {
		match: [
			/ETIMEDOUT/,
			/EHOSTUNREACH/,
			/ECONNRESET/,
			/ECONNREFUSED/,
			/ETIMEDOUT/,
			/ESOCKETTIMEDOUT/,
			/EHOSTUNREACH/,
			/EPIPE/,
			/EAI_AGAIN/,
			/SequelizeConnectionError/,
			/SequelizeConnectionRefusedError/,
			/SequelizeHostNotFoundError/,
			/SequelizeHostNotReachableError/,
			/SequelizeInvalidConnectionError/,
			/SequelizeConnectionTimedOutError/
		],
		max  : 5
    },
    dialectOptions: {
        connectTimeout: 60000
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('authenticate is succesfull');
    })
    .catch(err => {
        console.error('error=================', err);
        process.exit(-1);
    })

module.exports = sequelize;