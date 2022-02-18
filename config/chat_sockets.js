module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function (socket) {
        console.log('new connction is recived', socket.id);

        socket.on('disconnect', function () {
            console.log('socket disconnectd');
        });
    });
}