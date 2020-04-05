const PORT = 3000;
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var ranking = [];
var masterId = '';

app.use(express.static(publicPath));

server.listen(PORT, function() {
    console.log("server listening on port " + PORT);
});

io.on("connection", function(socket){
    console.log("user connected");

    socket.on('setMaster', function() {
        masterId = socket.id;
    });

    socket.on('getRanking', function(groupName){
        if (masterId == '')
            return;

        if (!ranking.includes(groupName)) {
            ranking.push(groupName);
            socket.emit('setRangking', ranking.indexOf(groupName) + 1);

            if (io.sockets.connected[masterId] !== undefined)
                io.sockets.connected[masterId].emit('setRankingView', groupName);
        }
    });

    socket.on('resetRanking', function(){
        console.log("Ranking reset");
        socket.broadcast.emit('resetRanking');
        ranking = [];
    });
});