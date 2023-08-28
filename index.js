const app = require('express')();
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    allowRequest: (req, callback) => {
        const noOriginHeader = req.headers.origin === undefined;
        callback(null, noOriginHeader);
    }
});
const port = process.env.PORT || 4000;

app.use(cors());

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    const porta = process.env.PORT || 4000;
    var conn = "".concat("ws://localhost:", porta);
    res.render('home', {port: conn});
});

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('message', (message) => {
        io.emit('message', message);
    });
});

server.listen(port, function() {
    console.log(`Listening on port ${port}`);
});