var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 1551;

//using client side js
app.use(express.static('public'));

var user = {}
io.use(function(socket, next){
    //console.log("Query: ", socket.handshake.query);
    //broadcasting to all client
    io.emit('user_joined', { user: socket.handshake.query.user });
    next();
});

//serving homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//on socket connection
io.on('connection', function (socket) {
    console.log("socket connected!!");

    //listening to incoming msg
    socket.on('send_msg', function (data) {
        //broadcasting to all client
        io.emit('send_msg', { text: data.text, user: data.user });
    });

    //on disconnect
    socket.on('disconnect', function (data) {
        console.log(data);
    });
});


//listining to port
server.listen(port);
console.log("Server runnning on port: " + port);
