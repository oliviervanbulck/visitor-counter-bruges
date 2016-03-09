var www = require('./bin/www');

var Counter = module.exports = {
    userCount: 0,
    averageWaitingTime: 0,
    io: null,
    connection: null,

    add: function() {
        Counter.userCount += 1;
        this.sendStatus(this.userCount);
        this.addDbIncoming();
    },
    remove: function() {
        Counter.userCount -= 1;
        this.sendStatus(this.userCount);

        this.sendStatus(this.userCount);

        this.addDbOutgoing();
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
    addDbIncoming: function() {
        var query = 'INSERT INTO visitor_counter.entries (datetime, inorout)' +
            ' VALUES (' + 'now()' + ',' + ' 1' + ')';
        console.log("DB Query:" + query);
        this.connection.query(query, function (err, rows, fields) {
            if (err) throw err;
        });
    },
    addDbOutgoing: function() {
        var query = 'INSERT INTO visitor_counter.entries (datetime, inorout)' +
            ' VALUES (' + 'now()' + ',' + ' 0' + ')';
        console.log("DB Query:" + query);
        this.connection.query(query, function (err, rows, fields) {
            if (err) throw err;
        });
    },
    calculateAverageTime: function () {
        var query = 'INSERT INTO visitor_counter.entries (datetime, inorout)' +
            ' VALUES (' + 'now()' + ',' + ' 0' + ')';
        console.log("DB Query:" + query);
        this.connection.query(query, function (err, rows, fields) {
            if (err) throw err;
        });
    },
    resetCounter: function() {
        this.userCount = 0;
        this.sendStatus();
        console.log("Counter reset from client.");
    }
}

function sendStatus(userCount) {

}

function getStatus(userCount) {

}