const app = require('express')();
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origins: "*"
    }
});

const port = process.env.PORT || 8080;

app.use(cors());

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    const conn = "".concat("ws://localhost:", port);
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