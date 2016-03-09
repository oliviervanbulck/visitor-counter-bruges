var express = require('express');
var router = express.Router();
var counter = require('../counter.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hairdressers, co.', page_title: 'Waiting room', seats: counter.userCount, seatstext: counter.userCount + ' / 12' });
});

module.exports = router;
