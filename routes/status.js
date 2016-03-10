var express = require('express');
var router = express.Router();

var counter = require('../counter.js');

router.get('/', function(req, res){
    res.send('' + counter.getStatus());
    console.log("==========  Status Request  ==========");
});

module.exports = router;