var express = require('express');
var fs = require('fs');

var router = express.Router();

/* GET heatmap image paths */
router.get('/', function(req, res, next) {

    var heatmapPaths = [];
    const heatmapDir = '../client/public/img/avg-heatmaps';

    fs.readdirSync(heatmapDir).forEach(file => {
        heatmapPaths.push(file);
    });

    res.json(heatmapPaths);
});

router.post('/', function(req, res) {
    console.log(req.body);
    res.send(req.body);
});

module.exports = router;
