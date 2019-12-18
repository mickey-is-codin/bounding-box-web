var mongoose = require('mongoose');

var BBoxSchema = new mongoose.Schema({
  filename: String,
  bbox: {
    left: Number,
    top: Number,
    width: Number,
    height: Number
  }
});

module.exports = mongoose.model('BBox', BBoxSchema, "bboxCollection");

