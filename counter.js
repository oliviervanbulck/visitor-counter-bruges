var www = require('./bin/www');

var Counter = module.exports = {
    userCount: 0,
    averageWaitingTime: 0,
    todayPeople: null,
    dayPopularity: null,
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
        var self = this;

        this.connection.query(monday_query, function (err, rows, fields) {
            if (err != null)
                console.log(err);
            //console.log(rows);
            //this.todayPeople = rows;

            var todayPeopleTemp = {};

            for (var i = 0; i < rows.length; i++) {
                var entryDate = new Date(rows[i]['datetime']);
                var entryDay = entryDate.getDay();
                var entryHours = entryDate.getHours();

                if (entryDay == 1 && rows[i]['inorout'] == 1) { // In JS Monday is 1
                    if ('' + entryHours in todayPeopleTemp) {
                        todayPeopleTemp['' + entryHours]++;

                    } else {
                        todayPeopleTemp['' + entryHours] = 1;
                        //console.log(entryDate.getHours());
                    }
                }
            }

            self.todayPeople =  todayPeopleTemp;  //JSON.parse(JSON.stringify(outputObject));

        });
    },
    getDayPopularTimes: function(forDay) {
        var day_query = 'SELECT inorout, datetime FROM visitor_counter.entries WHERE WEEKDAY(datetime) = '+ forDay; // We use the SQL format

        console.log("DB Query:" + day_query);
        var self = this;

        this.connection.query(day_query, function (err, rows, fields) {
            if (err != null)
                console.log(err);
            //console.log(rows);
            //this.todayPeople = rows;

            var popularityTemp = {};

            for (var i = 0; i < rows.length; i++) {
                var entryDate = new Date(rows[i]['datetime']);
                var entryDay = entryDate.getDay();
                var entryHours = entryDate.getHours();

                if (entryDay == forDay+1 && rows[i]['inorout'] == 1) { // In JS Monday is 1, in SQL 0, so +1
                    if ('' + entryHours in popularityTemp) {
                        popularityTemp['' + entryHours]++;

                    } else {
                        popularityTemp['' + entryHours] = 1;
                        //console.log(entryDate.getHours());
                    }
                }
            }

            self.dayPopularity =  popularityTemp;  //JSON.parse(JSON.stringify(outputObject));

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