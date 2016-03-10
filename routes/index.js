var express = require('express');
var router = express.Router();
var counter = require('../counter.js');
var keys = [ 'a', 'b', 'c'];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Hairdressers, co.',
    page_title: 'Waiting room',
    seats: counter.userCount,
    todayPeopleKeys: Object.keys(counter.todayPeople),
    todayPeopleValues: Object.keys(counter.todayPeople).map(function(key){return counter.todayPeople[key]}) });
});

module.exports = router;
