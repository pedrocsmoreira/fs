const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "https://fs-dashboard.adaptable.app",
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 5500;

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    const porta = process.env.PORT || 5500;
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