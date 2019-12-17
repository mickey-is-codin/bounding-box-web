var express = require('express');
var fs = require('fs');

var router = express.Router();

/* GET heatmap image paths */
router.get('/', function(req, res, next) {

    var heatmapPaths = [];
    const heatmapDir = 'data/avg-heatmaps';

    fs.readdirSync(heatmapDir).forEach(file => {
        heatmapPaths.push(file);
    });

    res.json(heatmapPaths);

});

module.exports = router;
