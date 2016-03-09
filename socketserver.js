var www = require('./app')

io.on('connection', function (socket) {
    console.log('Socket user connected')
})

var Socketserver = {
    sendStatus: function(userCount) {
        www.io.emit('userCount', userCount);
        www.io.emit('status', this.getStatus(userCount));
    },
    getStatus: function(userCount) {
        var status;
        if (userCount < 5)
            status = 1;
        else if (userCount < 10)
            status = 2;
        else
            status = 3;
        return status;
    },

}

//module.exports = Socketserver;