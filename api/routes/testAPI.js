var express = require('express');
var router = express.Router();

/* GET testAPI text. */
router.get('/', function(req, res, next) {
    res.send("Welcome to the Sacral Bounding Box API!");
});

module.exports = router;
