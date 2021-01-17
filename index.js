const
    settings = require('./settings.json'),
    express = require('express'),
    cors = require('cors'),
    http = require('http'),
    bodyParser = require('body-parser'),
    port = settings.port || 3000,
    app = express(),
    server = http.createServer(app),
    morgan = require('morgan');


app.use(bodyParser.urlencoded({ extended: false, limit: '100mb' }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.text());

app.use(morgan('dev'));

app.use('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
    res.header('')
    next();
});

app.options('*', cors());

// app.use('', require('./routes'));

server.listen(port, () => {
    console.log(`Server has started on port: ${port}`);
});

app.use('', require('./routes/index'));

app.all('*', function (req, res) {
    res.status(404).send({
        err: "Path or method are wrong"
    });
});

const io = require('socket.io')(server, {
    cors: {
        methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {
    require('./socket/dialogs')(socket, io);
    require('./socket/messages')(socket, io);
    require('./socket/users')(socket, io);
});

app.locals.io = io;