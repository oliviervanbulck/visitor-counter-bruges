var www = require('./bin/www');

var Counter = module.exports = {
    userCount: 0,
    averageWaitingTime: 0,
    todayPeople: [],
    io: null,
    connection: null,

    add: function() {
        Counter.userCount += 1;
        this.sendStatus(this.userCount);
        //this.addDbIncoming();
    },
    remove: function() {
        Counter.userCount -= 1;
        this.sendStatus(this.userCount);

        this.sendStatus(this.userCount);

        //this.addDbOutgoing();
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
            ' VALUES (' + 'now()' + ',' + ' -1' + ')';
        console.log("DB Query:" + query);
        this.connection.query(query, function (err, rows, fields) {
            if (err) throw err;
        });
    },
    getTodayVisitors: function () {
        var monday_query = 'SELECT inorout, datetime FROM visitor_counter.entries WHERE WEEKDAY(datetime) = \'0\''; // in SQL Monday is 0

        console.log("DB Query:" + monday_query);
        this.connection.query(monday_query, function (err, rows, fields) {
            console.log(err);
            //console.log(rows);
            //this.todayPeople = rows;

            var outputObject = {};

            for (var i = 0; i < rows.length; i++) {
                var entryDate = new Date(rows[i]['datetime']);
                var entryDay = entryDate.getDay();

                if (entryDay == 1 && rows[i]['inorout'] == 1) { // In JS Monday is 1
                    if ('' + entryDate.getHours() in outputObject) {
                        outputObject['' + entryDate.getHours()]++;
                    } else {
                        outputObject['' + entryDate.getHours()] = 1;
                        //console.log(entryDate.getHours());
                    }
                }
            }

            this.todayPeople = outputObject;
            console.log(Object.keys(this.todayPeople));
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