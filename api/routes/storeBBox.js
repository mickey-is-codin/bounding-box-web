var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

var BBoxModel = require('../models/bbox');

var router = express.Router();

router.post('/', function(req, res) {

    mongoose.connect('mongodb://localhost:27017/bboxes', {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function() {
      console.log("MongoDB Connection Successful!");

      var insertObject = {
        filename: req.body.filename,
        bboxes: [req.body.bbox]
      }

      BBoxModel.findOne({filename: req.body.filename}, function(err, matches) {
        console.log(req.body.bbox);
        if (matches) {
          console.log("Pushing onto array");
          BBoxModel.update(
            { filename: req.body.filename},
            { $push: {bboxes: req.body.bbox} },
            function(err, result) {
              if (err) {
                console.log(err);
              }
            }
          );
        } else {
          console.log("Making new DB entry");
          var bboxReceived = new BBoxModel(insertObject);
          bboxReceived.save(function(err, bbox) {
            if (err) {
              return(console.error(err));
            }
          });
        }
      });

      res.send("Great success");
    });
});

module.exports = router;
