var express = require('express');
var router = express.Router();
var counter = require('../counter.js');

counter.makeConnectionToDb();
counter.getTodayVisitors();
counter.getDayPopularTimes(1);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Hairdressers, co.',
    page_title: 'Waiting room',
    seats: counter.userCount,
    todayPeopleKeys: Object.keys(counter.todayPeople),
    todayPeopleValues: Object.keys(counter.todayPeople).map(function(key){return counter.todayPeople[key]}),
    dayPopularityKeys: Object.keys(counter.dayPopularity),
    dayPopularityValues: Object.keys(counter.dayPopularity).map(function(key){return counter.dayPopularity[key]})
  });
});

module.exports = router;
