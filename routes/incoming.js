var express = require('express');
var router = express.Router();

var counter = require('../counter.js');

router.get('/', function(req, res){

    counter.add();
    res.send('' + counter.getStatus());

    console.log("========== Incoming visitor ==========");

});

module.exports = router;