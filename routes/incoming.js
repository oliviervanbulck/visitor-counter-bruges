var express = require('express');
var router = express.Router();

var counter = require('../counter.js');

router.get('/', function(req, res){

    counter.add();
    res.sendStatus(200);

});

module.exports = router;