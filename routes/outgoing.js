var express = require('express');
var router = express.Router();

var counter = require('../counter.js');

router.get('/', function(req, res){

    if(counter.userCount > 0) {
        counter.remove();
    }

    res.send('' + counter.getStatus());

    console.log("========== Outgoing visitor ==========");
});

module.exports = router;