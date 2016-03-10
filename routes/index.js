var express = require('express');
var router = express.Router();
var counter = require('../counter.js');

try {
  counter.makeConnectionToDb();
  counter.getTodayVisitors();
  counter.getDayPopularTimes(1);
  counter.getAverageWaitingTime();

  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Hairdressers, co.',
      page_title: 'Waiting room',
      seats: counter.userCount,
      averageWaitingTime: counter.averageWaitingTime,
      todayPeopleKeys: Object.keys(counter.todayPeople),
      todayPeopleValues: Object.keys(counter.todayPeople).map(function (key) {
        return counter.todayPeople[key]
      }),
      dayPopularityKeys: Object.keys(counter.dayPopularity),
      dayPopularityValues: Object.keys(counter.dayPopularity).map(function (key) {
        return counter.dayPopularity[key]
      })
    });
  });
} catch (ex) {
  res.status(500).send('Connectivity to other services failed.')
}

module.exports = router;
