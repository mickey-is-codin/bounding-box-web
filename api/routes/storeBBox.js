var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

var BBoxModel = require('../models/bbox');

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

    mongoose.connect('mongodb://localhost:27017/bboxes', {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error: '));

    db.once('open', function() {
      console.log("MongoDB Connection Successful!");

      var bboxReceived = new BBoxModel(req.body);

      bboxReceived.save(function(err, bbox) {
        if (err) {
          return(console.error(err));
        }
        console.log("Filename " + bbox.filename + " saved to bboxes collection")
      });
      res.send("Great success");
    });
});

module.exports = router;
