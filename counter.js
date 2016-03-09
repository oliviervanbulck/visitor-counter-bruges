var www = require('./bin/www');

var Counter = module.exports = {
    userCount: 0,
    io: null,
    connection: null,

    add: function() {
        Counter.userCount += 1;

        this.sendStatus(this.userCount);

        this.addDb();

    },
    remove: function() {
        Counter.userCount -= 1;
        this.sendStatus(this.userCount);

        this.sendStatus(this.userCount);


    },
    sendStatus: function() {
        console.log("New count: " + this.userCount);
        this.io.emit('userCount', this.userCount);
        this.io.emit('status', getStatus());
    },
    getStatus: function() {
        var status;
        if(this.userCount < 5)
            status = 1;
        else if(this.userCount < 10)
            status = 2;
        else
            status = 3;
        return status;
    },
    addDb: function() {
        var query = 'INSERT INTO visitor_counter.visitor_info (datetime, inorout)' +
            ' VALUES (' + 'now()' + ',' + ' 1' + ')';
        console.log(query);
        this.connection.query(query, function (err, rows, fields) {
            if (err) throw err;
        });
    },
    removeDb: function() {
        var query = 'INSERT INTO visitor_counter.visitor_info (datetime, inorout)' +
            ' VALUES (' + 'now()' + ',' + ' 0' + ')';
        console.log(query);
        this.connection.query(query, function (err, rows, fields) {
            if (err) throw err;
        });
    }
}

function sendStatus(userCount) {

}

function getStatus(userCount) {

}